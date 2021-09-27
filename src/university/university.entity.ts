import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('universities_tbl')
export class University {
  @PrimaryColumn({name:'university_id', type: 'varchar'})
  university_id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'country', type: 'varchar' })
  country: string;

  @Column({ name: 'min_gre', type: 'int' })
  minGre: number;

  @Column({ name: 'min_gpa', type: 'decimal' })
  minGpa: number;
}
