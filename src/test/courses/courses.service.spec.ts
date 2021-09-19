import { Test } from '@nestjs/testing';
import { CoursesRepository } from '../../courses/courses.repository';
import { CoursesService } from '../../courses/courses.service';

const mockCourseRepository = () => ({
  save: jest.fn(),
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
});
