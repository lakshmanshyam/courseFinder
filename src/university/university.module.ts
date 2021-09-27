import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversitiesController } from './university.controller';
import { UniversityRepository } from './university.repository';
import { UniversityService } from './university.service';

@Module({
  imports: [TypeOrmModule.forFeature([UniversityRepository])],
  controllers: [UniversitiesController],
  exports: [UniversityService],
  providers: [UniversityService],
})
export class UniversityModule {}
