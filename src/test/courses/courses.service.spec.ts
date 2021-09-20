import { Test } from '@nestjs/testing';
import { CoursesRepository } from '../../courses/courses.repository';
import { CoursesService } from '../../courses/courses.service';

const mockCourseRepository = () => ({
  save: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn()
});
describe('Course service', () => {
  let coursesService: CoursesService;
  let courseRepository: CoursesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: CoursesRepository,
          useFactory: mockCourseRepository,
        },
      ],
    }).compile();

    coursesService = module.get(CoursesService);
    courseRepository = module.get(CoursesRepository);
  });

  it('create course', () => {
    coursesService.createCourse('test', 'testteacher', undefined);
    expect(courseRepository.save).toHaveBeenCalled();
  });

  it('update course', () => {
    coursesService.updateCourse('uuid');
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
