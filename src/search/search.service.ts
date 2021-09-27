import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchFiltersDto } from 'search/dto/searchFilters.dto';
import { INDEX } from '../common/constants';
import { Course } from './doc/course.doc';
import { mappings } from './doc/course.mapping';

@Injectable()
export class SearchService {

    constructor(private readonly esService: ElasticsearchService){}

    async createIndex(){

        const isIndexExisting = await this.esService.indices.exists({index: INDEX});
        
        if(isIndexExisting.statusCode === 404) {
            await this.esService.indices.create({
                index: INDEX,
                body: { mappings }
            });
        }
    }
    
    async addCourseToIndex(course: Course) : Promise<Course>{
        const response = await this.esService.index({index: INDEX, body: course});

        if(response.body.result === "created"){
            return course;
        }
    }

    async getCourse(courseId: string) : Promise<Course>{
        const response = await this.esService.search({
            index: INDEX,
            body: {
                query: {
                    match : {
                        query : courseId,
                        fields : ['course_id']
                    }
                }
            }
        });

        if(response.body.found){
            return <Course> response.body._source;
        }

        return undefined;
    }
    
    async getFilteredCourses(
        filter: SearchFiltersDto
      ): Promise<Course[]> {
    
        const { gpa, gre, country, name, count, after } = filter;
        console.log(name);
        const response = await this.esService.search({
            index: INDEX,
            body: {
                size: count,
                sort: [
                    { course_id: {order: "asc"}}
                ],
                query: {
                    bool: {
                        must: [ 
                            { match : {course_name: {query: name, fuzziness: 2}}},
                            { match : { country: country }}
                        ],
                        filter: [
                            {range: {gre: {gte: gre}}},
                            {range: {gpa: {gte: gpa}}}
                        ]
                    }
                },
                search_after: [after]
            }
        });
        
        if(response.body.found){
            return <Course[]> response.body._source;
        }

        console.log(response.body);
        return undefined;
      }
}
