import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { UniversityModule } from './university/university.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    CourseModule,
    UniversityModule,
    SearchModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      cache: true,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'course_finder',
      charset: 'utf8mb4',
      autoLoadEntities: true,
      synchronize: true,
      logging: ['schema', 'error'],
      migrationsRun: false,
      migrationsTableName: 'migration_table',
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    })
  ],
})
export class AppModule {}
