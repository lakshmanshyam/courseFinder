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
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseResponseDto } from './dto/CourseRespose.dto';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { SearchFiltersDto } from '../search/dto/searchFilters.dto';
import { UpdateCourseDto } from './dto/UpdateCourse.dto';
import { CourseMapper } from './course.mapper';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courses: CourseService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async createCourse(
    @Body() body: CreateCourseDto,
  ): Promise<CourseResponseDto> {
    const course = await this.courses.createCourse(body);
    console.log(course);
    return CourseMapper.mapCourseToCourseResponse(course);
  }

  @Patch(':course_id')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async updateCourse(
    @Param('course_id') courseId,
    @Body() body: UpdateCourseDto,
  ): Promise<string> {

    if (await this.courses.updateCourse(courseId, body)) {
      return 'SUCCESS';
    }

    throw new InternalServerErrorException();
  }

  @Delete(':course_id')
  async deleteCourse(
    @Param('course_id') courseId: string): Promise<CourseResponseDto> {
    const course = await this.courses.deleteCourse(courseId);
    return CourseMapper.mapCourseToCourseResponse(course);
  }

  @Get(':course_id')
  async getCourseDetails(@Param('course_id') courseId): Promise<CourseResponseDto> {
    return CourseMapper.mapCourseToCourseResponse(await this.courses.getCourseDetails(courseId));
  }

  @Get()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async getCourses( @Query() filter: SearchFiltersDto ): Promise<CourseResponseDto[]> {
    const courses: Course[] =  await this.courses.getFilteredCourses(filter);
    return courses.map((course) => CourseMapper.mapCourseToCourseResponse(course));
  }

  @Get('/es/search')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  async getCoursesFromIndex( @Query() filter: SearchFiltersDto ): Promise<CourseResponseDto[]> {
    const courses: Course[] =  await this.courses.getFilteredCoursesFromIndex(filter);
    return courses.map((course) => CourseMapper.mapCourseToCourseResponse(course));
  }
}
