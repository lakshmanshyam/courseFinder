import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateCourseDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  teacher?: string;

  @IsOptional()
  @IsUUID()
  university?: string;
}
