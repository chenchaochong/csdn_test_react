
create database comment;

use comment;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` char(32) NOT NULL,
  `uri` longtext CHARACTER SET utf8mb4 NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Table structure for `review`
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` char(32) NOT NULL,
  `uri` longtext CHARACTER SET utf8mb4 NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1',
  `rank` smallint(6) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `like` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


