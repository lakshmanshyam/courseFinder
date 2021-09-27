import { Course } from './course.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SearchFiltersDto } from 'search/dto/searchFilters.dto';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {

    getFilteredResults(filter: SearchFiltersDto): Promise<Course[]> {
        const { gpa, gre, country, name, count, after } = filter;
        const qb =  this.createQueryBuilder('course')
        .innerJoinAndSelect('course.university', 'university')
        .where('university.min_gpa >= :gpa', { gpa })
        .andWhere('university.min_gre >= :gre', { gre })
        .andWhere('university.country = :country', { country })
        .andWhere('SOUNDEX(course.name) = SOUNDEX(:name)', { name })
        .orderBy('course.course_id')
        .limit(count);

        if(after){
            console.log(after);
            qb.andWhere('course.course_id > :after',{after});
        }
        
        return qb.getMany();
    }
}
