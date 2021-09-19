import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PathUuidValidator } from '../common/PathUuidValidator.pipe';
import { Course } from '../entities/course.entity';
import { UniversitiesService } from '../universities/universities.service';
import { CoursesService } from './courses.service';
import { CourseResponseDto } from './dto/CourseRespose.dto';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { GetFilteredCoursesDto } from './dto/GetFilteredCourses.dto';
import { UpdateCourseDto } from './dto/UpdateCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courses: CoursesService,
    private readonly universities: UniversitiesService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async createCourse(
    @Body() body: CreateCourseDto,
  ): Promise<CourseResponseDto> {
    return await this.courses.createCourse(
      body.name,
      body.teacher,
      await this.universities.getUniversityDetails(body.university),
    );
  }

  @Patch(':course_uuid')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async updateCourse(
    @Param('course_uuid', new PathUuidValidator()) courseUuid,
    @Body() body: UpdateCourseDto,
  ): Promise<string> {
    if (
      await this.courses.updateCourse(
        courseUuid,
        body.name,
        body.teacher,
        await this.universities.getUniversityDetails(body.university),
      )
    ) {
      return 'SUCCESS';
    }

    throw new InternalServerErrorException();
  }

  @Delete(':course_uuid')
  async deleteCourse(
    @Param('course_uuid', new PathUuidValidator()) courseUuid,
  ): Promise<CourseResponseDto> {
    return await this.courses.deleteCourse(courseUuid);
  }

  @Get(':course_uuid')
  async getCourseDetails(
    @Param('course_uuid', new PathUuidValidator()) courseUuid,
  ): Promise<Course> {
    return await this.courses.getCourseDetails(courseUuid);
  }

  @Get()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async getCourses(
    @Query() filter: GetFilteredCoursesDto,
  ): Promise<CourseResponseDto[]> {
    const { gpa, gre, name, country } = filter;
    return await this.courses.getFilteredCourses(gpa, gre, country, name);
  }
}
