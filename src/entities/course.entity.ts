import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { University } from './university.entity';

@Entity('courses_tbl')
export class Course {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'teacher', type: 'varchar' })
  teacher: string;

  @ManyToOne(() => University, undefined, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'university_uuid',
    referencedColumnName: 'uuid',
  })
  university: University;
}
