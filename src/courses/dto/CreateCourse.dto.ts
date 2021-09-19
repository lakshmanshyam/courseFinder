import { IsNotEmpty } from 'class-validator';
export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  teacher: string;

  @IsNotEmpty()
  university: string;
}
