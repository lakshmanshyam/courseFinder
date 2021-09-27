import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { University } from './university.entity';
import { CreateUniversityDto } from './dto/CreateUniversity.dto';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversitiesController {
  constructor(private readonly universities: UniversityService) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async createUniversity(
    @Body() body: CreateUniversityDto,
  ): Promise<University> {
    return await this.universities.createUniversity(body);
  }

  @Delete(':university_id')
  async deleteCourse(
    @Param('university_id') universityId,
  ): Promise<University> {
    return await this.universities.deleteUniversity(universityId);
  }

  @Get()
  async getAllUniversities(): Promise<University[]> {
    return await this.universities.getAllUniversities();
  }

  @Get(':university_id')
  async getUniversityDetails(
    @Param('university_id') universityId,
  ): Promise<University> {
    return await this.universities.getUniversityDetails(universityId);
  }
}
