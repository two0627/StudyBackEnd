const express = require('express'); // Express 패키지 불러오기
const mysql = require('mysql2'); // mysql2 패키지 불러오기
require('dotenv').config(); // .env 파일 로드

const app = express(); // Express 애플리케이션 생성

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
  } else {
    console.log('DB 연결 성공!');

    // 여기에 데이터베이스 쿼리 실행 코드 추가
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        console.error('쿼리 실행 실패:', error);
      } else {
        console.log('쿼리 결과:', results);
      }
    });
  }
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 서버 시작
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

