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
import { PathUuidValidator } from '../common/PathUuidValidator.pipe';
import { University } from '../entities/university.entity';
import { CreateUniversityDto } from './dto/CreateUniversity.dto';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universities: UniversitiesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async createUniversity(
    @Body() body: CreateUniversityDto,
  ): Promise<University> {
    return await this.universities.createUniversity(body);
  }

  //   @Put(':university_uuid')
  //   updateUniversity(): void {}

  @Delete(':university_uuid')
  async deleteCourse(
    @Param('university_uuid', new PathUuidValidator()) universityUuid,
  ): Promise<University> {
    return await this.universities.deleteUniversity(universityUuid);
  }

  //   @Get()
  //   getAllUniversities(): any[] {
  //     return this.universities.getAllUniversities();
  //   }

  //   @Get('filter')
  //   getFilteredUniversities(@Query() filter) {}

  @Get(':university_uuid')
  async getUniversityDetails(
    @Param('university_uuid', new PathUuidValidator()) universityUuid,
  ): Promise<University> {
    return await this.universities.getUniversityDetails(universityUuid);
  }
}
