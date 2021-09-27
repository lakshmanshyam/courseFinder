import { IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  teacher?: string;

  @IsOptional()
  university?: string;
}
