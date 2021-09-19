import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { UniversitiesModule } from './universities/universities.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoursesModule,
    UniversitiesModule,
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
    }),
  ],
})
export class AppModule {}
