CREATE TABLE IF NOT EXISTS `t_wechat_app` (
  `openid` VARCHAR(40) DEFAULT '' COMMENT '用户的openid',
  `nickName` VARCHAR(255) DEFAULT '' COMMENT '用户昵称',
  `avatarUrl` VARCHAR(255) DEFAULT '' COMMENT '用户头像',
  `gender` TINYINT DEFAULT 0 COMMENT '用户性别',
  `country` VARCHAR(40) DEFAULT '' COMMENT '国家',
  `province` VARCHAR(20) DEFAULT '' COMMENT '省份',
  `city` VARCHAR(30) DEFAULT '' COMMENT '城市',
  `language` VARCHAR(10) DEFAULT '' COMMENT '语言',
  `status` TINYINT(1) DEFAULT 0 COMMENT '状态，默认0',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`openid`)
) ENGINE = InnoDB;