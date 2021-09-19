import { University } from '../entities/university.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {}
