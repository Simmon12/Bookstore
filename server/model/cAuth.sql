/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : cauth

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2019-05-12 00:46:34
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=812 DEFAULT CHARSET=utf8;

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
  `sectionTitles` text COMMENT '小说章节标题，以分隔符#相连',
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论唯一的ID',
  `avatarUrl` varchar(300) DEFAULT NULL COMMENT '用户头像url',
  `bookId` int(11) DEFAULT NULL COMMENT '评论对应的书本id',
  `star` int(11) DEFAULT NULL COMMENT '评价星星等级',
  `content` text COMMENT '评价内容',
  `nickName` varchar(50) DEFAULT NULL COMMENT '用戶名',
  `submitTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用戶評論時間',
  PRIMARY KEY (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for csessioninfo
-- ----------------------------
DROP TABLE IF EXISTS `csessioninfo`;
CREATE TABLE `csessioninfo` (
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';
