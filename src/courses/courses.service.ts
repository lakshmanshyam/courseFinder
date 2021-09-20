import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { University } from '../entities/university.entity';
import { v4 as uuid } from 'uuid';
import { CoursesRepository } from './courses.repository';
import { CourseResponseDto } from './dto/CourseRespose.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private readonly courseRepository: CoursesRepository,
  ) {}
  private courses: Course[] = [];

  courseToCourseResponseDto(course: Course) {
    const { uuid, name, teacher } = course;
    const newCourse: CourseResponseDto = {
      uuid,
      name,
      teacher,
      university: course.university.uuid,
    };
    return newCourse;
  }

  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCourseDetails(courseUuid: string): Promise<Course> {
    return await this.courseRepository.findOne({ where: { uuid: courseUuid } });
  }

  async createCourse(
    name: string,
    teacher: string,
    university: University,
  ): Promise<CourseResponseDto> {
    const course = { uuid: uuid(), name, teacher, university };
    await this.courseRepository.save(course);
    return this.courseToCourseResponseDto(course);
  }

  async deleteCourse(courseUuid: string): Promise<CourseResponseDto> {
    const response = await this.courseRepository.findOne({
      where: { uuid: courseUuid },
    });
    const {
      raw: { affectedRows = 0 },
    } = await this.courseRepository.delete({ uuid: courseUuid });

    const result = affectedRows > 0 ? this.courseToCourseResponseDto(response) : undefined;
    return result;
  }

  async updateCourse(
    uuid: string,
    name?: string,
    teacher?: string,
    university?: University,
  ): Promise<boolean> {
    try {
      await this.courseRepository.insert(<Course>{
        uuid,
        name,
        teacher,
        university,
      });
    } catch (err) {
      return false;
    }
    return true;
  }

  async getFilteredCourses(
    gpa?: number,
    gre?: number,
    country?: string,
    name?: string,
  ): Promise<CourseResponseDto[]> {
    let qb = this.courseRepository
      .createQueryBuilder('course')
      .innerJoinAndSelect('course.university', 'university')
      .where('course.name LIKE :name', { name: `%${name ? name : ''}%` });

    if (gpa) {
      qb = qb.andWhere('university.min_gpa >= :gpa', { gpa });
    }
    if (gre) {
      qb = qb.andWhere('university.min_gre >= :gre', { gre });
    }
    if (country) {
      qb = qb.andWhere('university.country = :country', { country });
    }

    const result = await qb.getMany();

    return result.map((course) => this.courseToCourseResponseDto(course));
  }
}
