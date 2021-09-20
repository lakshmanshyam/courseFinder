

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository.

mysql version : 5.7.24

app runs in localhost:3000 you can customise the port in main.ts file 
## Search API Documentaiton

GET localhost:3000/courses (gives all courses)

GET localhost:3000/courses?gpa=6.7 (gives all courses with gpa >= 6.7)

GET localhost:3000/courses?gre=430 (gives all courses with gre >= 430)

GET localhost:3000/courses?name="ha" (gives all courses containing ha in its name)

GET localhost:3000/courses?country="US" (gives all courses from country)

all the 4 parameters can be used in any combination

## Utility API Documentation

for courses 

POST localhost:3000/courses (create a course ) 

GET localhost:3000/courses/{course_uuid} ( get a single course details )

PATCH localhost:3000/courses/{course_uuid} {update any name, teacher, university of a course}

DELETE localhost:3000/courses/{course_uuid} (delete the course)

for universities

POST localhost:3000/universities (create a university ) 

GET localhost:3000/universities/{university_uuid} ( get a single university details )

DELETE localhost:3000/universities/{university_uuid} (delete the university)

## Installation Process

## Database 

mysql Db dump with sample data is added to the repo (mysqlDump/projectDump.sql) 

use the following command to load the dump to mysql 

```bash
$ mysql -u root -p course_finder < mysqlDump.sql
```

This will create a new db named course_finder 

It consists of two tables
1. courses_tbl
2. universities_tbl

## configure 

Open app.module.ts file in the src directory of this project 
configure mysql ( host, port, user, password ) for the application to connect to mysql

## Install application using Yarn

```bash
$ npm install yarn
```

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev


## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Install application using npm

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev


## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## postman scripts

you can also import the postman collection usign the file 

courseFinder.postman_collection.json available in the repo to test the application
