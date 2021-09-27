import { IsNotEmpty, IsNumberString, IsOptional, IsString, Max } from 'class-validator';

export class SearchFiltersDto {

  @IsNotEmpty()
  @IsNumberString()
  gpa: number;

  @IsNotEmpty()
  @IsNumberString()
  gre: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumberString()
  @IsOptional()
  count?: number = 10

  @IsString()
  @IsOptional()
  after?: string
}
