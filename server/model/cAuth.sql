/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

-- ----------------------------
-- [Err] 1451 -Cannot delete or update a parent row: a foreign key constraint fails (...)
-- 这是因为MySQL中设置了foreign key关联，造成无法更新或删除数据。
-- 可以通过设置FOREIGN_KEY_CHECKS变量来避免这种情况。
---------------------
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bookcontent
-- ----------------------------
DROP TABLE IF EXISTS `bookcontent`;
CREATE TABLE `bookcontent` (
  `sectionId` int(11) NOT NULL AUTO_INCREMENT COMMENT '章节ID',
  `sectionNum` int(11) DEFAULT NULL,
  `sectionTitle` varchar(100) DEFAULT NULL COMMENT '章节标题',
  `sectionContent` text COMMENT '章节内容',
  `bookName` varchar(100) DEFAULT NULL COMMENT '小说ID',
  PRIMARY KEY (`sectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for booklist
-- ----------------------------
DROP TABLE IF EXISTS `booklist`;
CREATE TABLE `booklist` (
  `bookId` int(11) NOT NULL AUTO_INCREMENT COMMENT '小说id',
  `bookName` varchar(100) NOT NULL COMMENT '小说名',
  `bookDes` text COMMENT '小说简介',
  `bookImage` varchar(100) DEFAULT NULL COMMENT '小说封面链接',
  `bookType` varchar(100) DEFAULT NULL COMMENT '书籍分类',
  `author` varchar(50) DEFAULT NULL COMMENT '作者名',
  `sectionArray` text COMMENT '小说章节列表，以分隔符-相连',
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
