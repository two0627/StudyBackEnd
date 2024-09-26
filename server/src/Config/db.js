// config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // 환경변수 로드

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// 데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
    return;
  }
  console.log('DB 연결 성공!');
});

module.exports = connection; // 연결 객체 내보내기
