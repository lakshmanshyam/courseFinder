import { IsOptional } from 'class-validator';

export class GetFilteredCoursesDto {
  @IsOptional()
  gpa?: number;

  @IsOptional()
  gre?: number;

  @IsOptional()
  country?: string;

  @IsOptional()
  name?: string;
}
