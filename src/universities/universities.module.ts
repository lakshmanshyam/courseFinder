import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversitiesController } from './universities.controller';
import { UniversityRepository } from './universities.repository';
import { UniversitiesService } from './universities.service';

@Module({
  imports: [TypeOrmModule.forFeature([UniversityRepository])],
  controllers: [UniversitiesController],
  exports: [UniversitiesService],
  providers: [UniversitiesService],
})
export class UniversitiesModule {}
