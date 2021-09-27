import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './university.entity';
import { CreateUniversityDto } from './dto/CreateUniversity.dto';
import { UniversityRepository } from './university.repository';
var crypto = require('crypto');

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(UniversityRepository)
    private readonly universityRepository: UniversityRepository,
  ) {}

  async getUniversityDetails(universityId: string): Promise<University> {
    return await this.universityRepository.findOne({
      where: { university_id: universityId },
    });
  }

  async createUniversity(body: CreateUniversityDto): Promise<University> {
    const { minGpa, minGre, name, country, description } = body;
    const newId = crypto.createHash('md5').update(name).digest('hex');
    const university = new University();
    university.university_id = newId;
    university.name = name;
    university.description = description;
    university.country = country;
    university.minGpa = minGpa;
    university.minGre = minGre;
    return await this.universityRepository.save(university);
  }

  async deleteUniversity(id: string): Promise<University> {
    const response = await this.universityRepository.findOne({where: { id }});
    const { raw: { affectedRows = 0 }} = await this.universityRepository.delete({ university_id: id });
    return affectedRows > 0 ? response : undefined;
  }

  async getAllUniversities(): Promise<University[]> {
    return this.universityRepository.find();
  }
}
