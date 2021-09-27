import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  country: string;

  @IsNumber()
  minGpa: number;

  @IsNumber()
  minGre: number;
}
