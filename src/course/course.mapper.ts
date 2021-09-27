import { CourseResponseDto } from "course/dto/CourseRespose.dto";
import { Course } from "course/course.entity";
import { Course as CourseDoc} from "search/doc/course.doc";
import { CreateCourseDto } from "./dto/CreateCourse.dto";
var crypto = require('crypto');

export class CourseMapper {
    public static mapCourseToCourseResponse(course: Course) : CourseResponseDto {
      const courseResponse = new CourseResponseDto();
      const { course_id, name, teacher } = course;
      
      courseResponse.id = course_id;
      courseResponse.name = name;
      courseResponse.teacher = teacher;
      courseResponse.university = course.university_id;

      return courseResponse;
    }

    public static mapCreateCourseDtoToCourse(createCourseDto: CreateCourseDto): Course {
      const {name, teacher, university: university_id} = createCourseDto;
      const newId = crypto.createHash('md5').update(name).digest('hex');
  
      const course = new Course();
      course.course_id = `${university_id}-${newId}`;
      course.name = name;
      course.teacher = teacher;
      course.university_id = university_id;

      return course;
    }

    public static mapCourseDocToCourse(courseDoc: CourseDoc): Course {
      const course = new Course();
      const {course_id, name, teacher} = courseDoc;
      
      course.course_id = course_id;
      course.name = name;
      course.teacher = teacher;
      course.university_id = course_id.split('-')[0];

      return course;
    }
}