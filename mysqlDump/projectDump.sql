-- MySQL dump 10.13  Distrib 5.7.24, for macos10.14 (x86_64)
--
-- Host: localhost    Database: course_finder
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses_tbl`
--

DROP TABLE IF EXISTS `courses_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_tbl` (
  `name` varchar(255) NOT NULL,
  `teacher` varchar(255) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `university_id` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FK_b77dc9c21a6bcb05e1348d13644` (`university_id`),
  CONSTRAINT `FK_b77dc9c21a6bcb05e1348d13644` FOREIGN KEY (`university_id`) REFERENCES `universities_tbl` (`university_id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_tbl`
--

LOCK TABLES `courses_tbl` WRITE;
/*!40000 ALTER TABLE `courses_tbl` DISABLE KEYS */;
INSERT INTO `courses_tbl` VALUES ('computer science','lakshman','14d81618-b747-437f-b14e-e9acf11ab2ba','28574720-8316-4cac-ac75-5b27c9bbe4af'),('ece','kumar','1ba5caa0-c085-4225-a206-6b3a442a06bd','28574720-8316-4cac-ac75-5b27c9bbe4af'),('data science','lak','56bb4677-ab1d-4487-9a41-ce85535ff74e','28574720-8316-4cac-ac75-5b27c9bbe4af'),('cse','shyam','6785f73b-dce0-4961-a123-6de25ca5d53d','28574720-8316-4cac-ac75-5b27c9bbe4af'),('computer science','sss','9aac6c26-2ffb-405f-9f7b-10692222a8f2','fd17338c-cd9d-467e-8384-155207cca98f'),('data science','eee','a41d289c-2470-46ee-99c9-cd04e49f00c8','fd17338c-cd9d-467e-8384-155207cca98f'),('AI','shyam','acc4f1c9-bb5e-4d07-b16a-5c9e46c7f950','fd17338c-cd9d-467e-8384-155207cca98f'),('cse','xyz','ae081018-dfdc-4609-83eb-59069acd9a27','0dcbb0a8-549b-4183-94d6-410d6b7b5d44'),('computer science','fff','c7a626a6-80b6-4d12-b437-126e1304fdb3','0dcbb0a8-549b-4183-94d6-410d6b7b5d44'),('ece','abc','d0318994-0684-415c-8aeb-77d8743ff6e0','0dcbb0a8-549b-4183-94d6-410d6b7b5d44'),('AI','lakshman','d393d84f-d043-49d5-b1b5-5979ebef8ba0','28574720-8316-4cac-ac75-5b27c9bbe4af'),('data science','ggg','fe4e09a2-f1f6-47e8-acec-bb2fc73981ac','0dcbb0a8-549b-4183-94d6-410d6b7b5d44');
/*!40000 ALTER TABLE `courses_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `query-result-cache`
--

DROP TABLE IF EXISTS `query-result-cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `query-result-cache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `time` bigint(20) NOT NULL,
  `duration` int(11) NOT NULL,
  `query` text NOT NULL,
  `result` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `query-result-cache`
--

LOCK TABLES `query-result-cache` WRITE;
/*!40000 ALTER TABLE `query-result-cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `query-result-cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities_tbl`
--

DROP TABLE IF EXISTS `universities_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `universities_tbl` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `min_gpa` decimal(3,2) NOT NULL,
  `min_gre` int(11) NOT NULL,
  `university_id` varchar(255) NOT NULL,
  PRIMARY KEY (`university_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities_tbl`
--

LOCK TABLES `universities_tbl` WRITE;
/*!40000 ALTER TABLE `universities_tbl` DISABLE KEYS */;
INSERT INTO `universities_tbl` VALUES ('stanford','very popular','US',7.20,550,'0dcbb0a8-549b-4183-94d6-410d6b7b5d44'),('harward','popular','US',6.20,450,'28574720-8316-4cac-ac75-5b27c9bbe4af'),('ubc','abc popular','US',5.20,400,'fd17338c-cd9d-467e-8384-155207cca98f');
/*!40000 ALTER TABLE `universities_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-27  4:39:11
