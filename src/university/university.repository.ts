import { University } from './university.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {}
