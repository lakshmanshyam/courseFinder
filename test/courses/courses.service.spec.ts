import { Test } from '@nestjs/testing';
import { CourseRepository } from '../../src/course/course.repository';
import { CourseService } from '../../src/course/course.service';

const mockCourseRepository = () => ({
  save: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn()
});
describe('Course service', () => {
  let coursesService: CourseService;
  let courseRepository: CourseRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: CourseRepository,
          useFactory: mockCourseRepository,
        },
      ],
    }).compile();

    coursesService = module.get(CourseService);
    courseRepository = module.get(CourseRepository);
  });

  it('create course', () => {
    coursesService.createCourse({ name:'test', teacher: 'testteacher', university: undefined});
    expect(courseRepository.save).toHaveBeenCalled();
  });

  it('update course', () => {
    coursesService.updateCourse('uuid', {name:'test', teacher: 'testteacher'});
    expect(courseRepository.insert).toHaveBeenCalled();
  });

  it('delete course', () => {
    coursesService.deleteCourse('uuid');
    expect(courseRepository.findOne).toHaveBeenCalled();
    expect(courseRepository.delete).toHaveBeenCalled();
  });

  it('get order details', () => {
    coursesService.getCourseDetails('uuid');
    expect(courseRepository.findOne).toHaveBeenCalled();
  });
});
