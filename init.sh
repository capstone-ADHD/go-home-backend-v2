#!/bin/bash

# MySQL 데이터베이스 초기화
mysqld --initialize-insecure --user=mysql

# MySQL 데몬 백그라운드 실행
mysqld_safe &

# MySQL이 뜰 때까지 기다림
sleep 5

# 비밀번호 설정 및 DB 생성
mysql -u root <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
CREATE DATABASE IF NOT EXISTS gohome;
FLUSH PRIVILEGES;
EOF

# NestJS 서버 실행
npm run start