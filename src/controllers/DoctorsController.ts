import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import findCep from '../api/ApiCorreios';

import Doctor from '../models/Doctor';
import CreateDoctorService from '../services/CreateDoctorService';

export default {
	async index(req: Request, res: Response) {
		const { specialty } = req.query;

		try {
			const doctorsRepository = getRepository(Doctor);
			const doctors = specialty
				? await doctorsRepository
						.createQueryBuilder('doctors')
						//Busca por especialidade
						.where(
							":specialty = ANY ( string_to_array(doctors.specialties, ','))",
							{ specialty: specialty },
						)
						.getMany()
				: await doctorsRepository.find({ ...req.query });

			return res.json(doctors);
		} catch (error) {
			return res.status(404).json({ message: 'Not found' })
		}
	},

	async create(req: Request, res: Response) {
		const crmRegExp = /^\d{2}.\d{3}.\d{2}/;
		const phoneRegExp = /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b$/;
		const zipCodeRegExp = /[0-9]{5}-[\d]{3}$/;

		const doctorsRepository = getRepository(Doctor);

		//Validações
		const schema = Yup.object().shape({
			name: Yup.string().required().max(120, 'Must be exactly 120 caracters'),

			crm: Yup.string()
				.required()
				.matches(crmRegExp, 'Must be only digits, example: 12.345.67'),

			landline: Yup.string()
				.required()
				.matches(phoneRegExp, 'Landline invalid'),

			mobilePhone: Yup.string()
				.required()
				.matches(phoneRegExp, 'Mobile Phone invalid'),

			zipCode: Yup.string()
				.required()
				.matches(zipCodeRegExp, 'Invalid ZipCode, example: 12345-678'),

			specialties: Yup.array().required(),
		});

		await schema
			.validate({ ...req.body }, { abortEarly: false })
			.then(async () => {
				const createDoctor = new CreateDoctorService();

				//Consulta do CEP
				const {
					localidade: city,
					bairro: neighborhood,
					logradouro: street,
					uf: state,
				} = await findCep(req.body.zipCode);

				const doctor = await createDoctor.execute({
					...req.body,
					address: { city, neighborhood, street, state },
				});

				await doctorsRepository.save(doctor);

				return res.status(201).json(doctor);
			})
			.catch(error => {
				return res
					.status(400)
					.json({ message: `Validation errors: ${error.message}` });
			});
	},

	async update(req: Request, res: Response) {
		const { id } = req.params;

		const doctorsRepository = getRepository(Doctor);
		const doctor = await doctorsRepository.findOne(id);

		if (doctor) {
			doctorsRepository.merge(doctor, req.body);
			const updateSave = await doctorsRepository.save(doctor);

			return res.json(updateSave);
		}

		return res.status(404).json({ msg: 'Not Doctor found' });
	},

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const doctorsRepository = getRepository(Doctor);
		const doctor = await doctorsRepository.delete(id);

		return res.json({ message: 'Doctor removed' });
	},
};
