import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversitiesModule } from '../universities/universities.module';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

@Module({
  imports: [UniversitiesModule, TypeOrmModule.forFeature([CoursesRepository])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
