# 1. Ubuntu 최신 이미지 사용
FROM ubuntu:22.04

# 2. 환경변수 설정 (비대화 모드 설치용)
ENV DEBIAN_FRONTEND=noninteractive

# 3. 필수 패키지 설치 및 Node.js 20 설치
RUN apt-get update && \
    apt-get install -y curl gnupg lsb-release mysql-server && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# 4. 작업 디렉토리 설정
WORKDIR /app

# 5. 앱 소스 복사 및 의존성 설치
COPY . .
RUN npm install

# MySQL 권한 설정
RUN mkdir -p /var/run/mysqld && chown -R mysql:mysql /var/run/mysqld /var/lib/mysql

# 설정 파일 복사 (선택)
RUN echo "[mysqld]\nskip-networking=0\nskip-bind-address\n" > /etc/mysql/mysql.conf.d/mysqld.cnf

# 초기화 스크립트 복사 및 실행 권한
COPY init.sh /init.sh
RUN chmod +x /init.sh

CMD ["/init.sh"]