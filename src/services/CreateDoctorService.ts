import { getRepository } from 'typeorm';
import Doctor from '../models/Doctor';

interface Request {
	name: string;
	crm: string;
	landline: string;
	mobilePhone: string;
	zipCode: string;
	specialties: [];
	address?: {};
}

class CreateDoctorService {
	public async execute({
		name,
		crm,
		landline,
		mobilePhone,
		zipCode,
		specialties,
		address
	}: Request): Promise<Doctor> {
		const doctorsRepository = getRepository(Doctor);

		const checkDoctorExists = await doctorsRepository.findOne({
			where: { crm },
		});

		//Verificação se o CRM já foi cadastrado
		if (checkDoctorExists) {
			throw new Error('CRM already used');
		}

		const doctor = doctorsRepository.create({
			name,
			crm,
			landline,
			mobilePhone,
			zipCode,
			specialties,
			address
		});

		await doctorsRepository.save(doctor);

		return doctor;
	}
}

export default CreateDoctorService;
