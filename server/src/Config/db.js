const mysql = require('mysql2');
require('dotenv').config(); // 환경변수 로드

// MySQL 데이터베이스 연결 풀 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true, // 연결 대기
  connectionLimit: 10, // 최대 연결 수
  queueLimit: 0 
});

module.exports = pool; // 연결 풀 내보내기
