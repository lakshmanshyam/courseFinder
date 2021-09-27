import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { University } from '../university/university.entity';

@Entity('courses_tbl')
export class Course {
  @PrimaryColumn({name: 'course_id', type: 'varchar'})
  course_id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'teacher', type: 'varchar' })
  teacher: string;

  @Column({ name: 'university_id', type: 'varchar' })
  university_id: string;

  @ManyToOne(() => University, undefined, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'university_id',
    referencedColumnName: 'university_id',
  })
  university: University;
}
