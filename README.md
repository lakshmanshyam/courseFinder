

## Description

[Nest](https://github.com/nestjs/nest) framework 

Language: TypeScript
mysql version : 5.7.24
elastic search : 7.15
## Search API Documentaiton

I have implemented two approaches of search apis
 
 1. phonetic search using mysql SOUNDEX

    Here we are using mysql's SOUNDEX function to match course names with search string. This search algorithm is based on phonetics.
    the course name and search string are converted to phonetic characters and see if they are matching ( similar sounds match)

    This approach will give us near good results but will be highly consistent

```bash 
    GET localhost:3000/course?gpa=<gpa score>&gre=<gre score>&country=<country name>&name=<search string>[&size=<10>&after=<course id>]
```

 2. fuzzy search using elastic search (work in progress)

    Here we use mysql for storing universities and courses. 
    We update elastic search with the search parameters that we support

    keeping elastic search in sync with mysql is concern which needs to be addressed
    This is the trade off we can do for getting 2 char distance fuzzy search 

```bash
    GET localhost:3000/course/search?gpa=<gpa score>&gre=<gre score>&country=<country name>&name=<search string>[&size=<10>&after=<course id>]
```
## Utility API Documentation

1. courses 

```bash
    POST localhost:3000/course (create a course ) 

    GET localhost:3000/course/{course_id} ( get a single course details )

    PATCH localhost:3000/course/{course_id} {update any name, teacher, university of a course}

    DELETE localhost:3000/course/{course_id} (delete the course)
```

2. universities

```bash
    POST localhost:3000/university (create a university ) 

    GET localhost:3000/university/{university_id} ( get a single university details )

    DELETE localhost:3000/university/{university_id} (delete the university)
```

## configure (TODO: need to add support for application config)

1. app config 
    app runs on "http://localhost:3000" 
    you can customise the port in sr/main.ts file
2. mysql 
    mysql config can be updated in src/app.module.ts file
    configure host, port, user, password params for the application to connect to local mysql
## Installation Process

1. elasticsearch

Installing standalone version of elasticsearch

```bash
$ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.0
```
```bash
$ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.0
```

2. Database (mysql)

mysql Db dump with sample data is added to the repo (mysqlDump/projectDump.sql) 

use the following command to load the dump to mysql 

```bash
$ mysql -u root -p course_finder < mysqlDump.sql
```

This will create a new db named course_finder 

It consists of two tables
    1. courses_tbl
    2. universities_tbl
## Running backend application using Yarn

```bash
$ npm install yarn
```
## Running the app

```bash
$ yarn install

$ yarn start
```

## Test (TODO : yet to add unit testcases )

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```
## postman scripts

you can also import the postman collection usign the file 

```bash
postman/courseFinder.postman_collection.json 
```

available in the repo to test the application
