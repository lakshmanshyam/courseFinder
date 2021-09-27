import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Course as CourseDoc } from '../search/doc/course.doc';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { UpdateCourseDto } from './dto/UpdateCourse.dto';
import { SearchFiltersDto } from '../search/dto/searchFilters.dto';
import { UniversityService } from 'university/university.service';
import { SearchService } from 'search/search.service';
import { CourseMapper } from './course.mapper';


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository,
    private readonly universityService: UniversityService,
    private readonly searchService: SearchService,
  ) {}

  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCourseDetails(courseId: string): Promise<Course> {
    return await this.courseRepository.findOne(courseId);
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = CourseMapper.mapCreateCourseDtoToCourse(createCourseDto);
    try {
      console.log("adding course to es", course);
      await this.addCourseToSearch(course);
      console.log("adding course to db", course)
      return this.courseRepository.save(course);
    } catch(err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async deleteCourse(courseId: string): Promise<Course> {
    const response = await this.courseRepository.findOne(courseId);
    const deleteResult = await this.courseRepository.delete({course_id:courseId});
    return deleteResult.raw.affectedRows > 0 ? response : undefined;
  }

  async updateCourse(courseId: string, updateCourse: UpdateCourseDto): Promise<boolean> {
    const {name, teacher, university: university_id} = updateCourse;
    const course = this.courseRepository.create({course_id: courseId,name,teacher,university_id});
    const insertResult = await this.courseRepository.insert(course);
    return insertResult.raw.affectedRows !== 0 ? true : false;
  }

  async getFilteredCourses(
    filter: SearchFiltersDto
  ): Promise<Course[]> {
    return this.courseRepository.getFilteredResults(filter);
  }

  async getFilteredCoursesFromIndex(filter: SearchFiltersDto): Promise<Course[]> {
    const result: CourseDoc[] = await this.searchService.getFilteredCourses(filter);
    return result.map((courseDoc: CourseDoc) => CourseMapper.mapCourseDocToCourse(courseDoc));
  }

  private async addCourseToSearch(course: Course){
    const university = await this.universityService.getUniversityDetails(course.university_id);
    const searchEntry = new CourseDoc();
    searchEntry.course_id = course.course_id;
    searchEntry.name = course.name;
    searchEntry.country = university.country;
    searchEntry.minGpa = university.minGpa;
    searchEntry.minGre = university.minGre;
    
    await this.searchService.addCourseToIndex(searchEntry);
  }
}
