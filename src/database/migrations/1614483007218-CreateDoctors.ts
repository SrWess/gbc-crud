import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDoctors1614483007218 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'doctors',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
            default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'crm',
						type: 'varchar',
					},
					{
						name: 'landline',
						type: 'varchar',
					},
					{
						name: 'mobilePhone',
						type: 'varchar',
					},
					{
						name: 'zipCode',
						type: 'varchar',
					},
					{
						name: 'specialties',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'address',
						type: 'json',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		//Remove Table
		await queryRunner.dropTable('doctors');
	}
}
