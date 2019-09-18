CREATE TABLE IF NOT EXISTS `t_user` (
  `id` INTEGER auto_increment,
  `uuid` VARCHAR(40) DEFAULT '' COMMENT '用户的uuid',
  `username` VARCHAR(255) DEFAULT '' COMMENT '用户名',
  `headimg` VARCHAR(255) DEFAULT '' COMMENT '头像',
  `tell` VARCHAR(255) DEFAULT '' COMMENT '手机号',
  `openid` VARCHAR(255) DEFAULT '' COMMENT '微信的openid',
  `status` TINYINT DEFAULT 0 COMMENT '状态;0:失效;1:使用',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
ALTER TABLE
  `t_user`
ADD
  INDEX `t_user_uuid` (`uuid`)