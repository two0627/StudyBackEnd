const express = require('express'); // Express 패키지 불러오기
const mysql = require('mysql2'); // mysql2 패키지 불러오기
require('dotenv').config(); // .env 파일 로드

const app = express(); // Express 애플리케이션 생성

// MySQL DB 연결 풀 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // 동시에 최대 10개의 연결을 유지
  queueLimit: 0 // 대기열 제한 없음
});

// DB 쿼리 실행
pool.query('SELECT * FROM users', (error, results) => {
  if (error) {
    console.error('쿼리 실행 실패:', error);
  } else {
    console.log('쿼리 결과:', results);
  }
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 서버 시작
app.listen(3000, () => {
  console.log('현재 3000번 포트에서 실행되고 있습니다!');
});

/*
createpool은 미리 여러 개의 연결을 생성하고 클라이언트 요청 시 연결을 재사용하는데에 반해 createconnection은 매번 DB에 연결할 때 새로운 연결을 생성함. 
createconnection은 다수의 클라이언트 요청이 있을시 성능저하가 발생할 수 있으므로 적은 수의 연결이 필요한 애플리케이션에 적합함.
createpool은 많은 수의 클라이언트 요청을 효율적으로 처리해 규모가 큰 애플리케이션에 적합함. 
Ai 다이어리의 경우 다수의 사용자가 동시에 다이어리를 작성한다던가 감정분석을 요구할 경우 규모가 커짐으로 createpool이 더 효율적이고 안정적인 연결방법으로 보임.*/