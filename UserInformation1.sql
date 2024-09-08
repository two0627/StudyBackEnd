USE DATABASE1;

-- 기존 테이블 삭제
DROP TABLE IF EXISTS users;

-- 유저 테이블 생성
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 유저 데이터 삽입
INSERT IGNORE INTO users (username, password_hash, email, phone_number) VALUES
('HongGulDong', 'password_example', 'GulDong@gmail.com', '010-1234-5678');

SELECT * FROM users;
