import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('doctors')
class Doctor {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 120
	})
	name: string;

	@Column()
	crm: string;

	@Column()
	landline: string;

	@Column()
	mobilePhone: string;

	@Column()
	zipCode: string;

	@Column("simple-array")
	specialties: string[];

	@Column("simple-json")
	address?: {};
}

export default Doctor;
