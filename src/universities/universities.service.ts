import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from '../entities/university.entity';
import { v4 as uuid } from 'uuid';
import { CreateUniversityDto } from './dto/CreateUniversity.dto';
import { UniversityRepository } from './universities.repository';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(UniversityRepository)
    private readonly universityRepository: UniversityRepository,
  ) {}

  async getUniversityDetails(universityUuid: string): Promise<University> {
    return await this.universityRepository.findOne({
      where: { uuid: universityUuid },
    });
  }

  async createUniversity(body: CreateUniversityDto): Promise<University> {
    const { minGpa, minGre, name, country, description } = body;
    console.log(minGpa);
    return await this.universityRepository.save(<University>{
      uuid: uuid(),
      name,
      description,
      country,
      minGpa: minGpa,
      minGre: minGre,
    });
  }

  async deleteUniversity(universityUuid: string): Promise<University> {
    const response = await this.universityRepository.findOne({
      where: { uuid: universityUuid },
    });
    const {
      raw: { affectedRows = 0 },
    } = await this.universityRepository.delete({ uuid: universityUuid });

    return affectedRows > 0 ? response : undefined;
  }
}
