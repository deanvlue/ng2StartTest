/*CREATE DATABASE test_nd DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;*/
USE `test_nd`;

CREATE TABLE IF NOT EXISTS `projects` (
	`id` int(11) not null auto_increment,
	`name` varchar(20) COLLATE utf8_unicode_ci not null,
	`user_id` int(11) not null,
	PRIMARY KEY(`id`),
	KEY id(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `users`(
	`id` int(11) not null auto_increment,
	`name` varchar(20) COLLATE utf8_unicode_ci not null,
	`password` varchar(20) collate utf8_unicode_ci not null,
	PRIMARY KEY(`id`),
	UNIQUE KEY id (`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;
