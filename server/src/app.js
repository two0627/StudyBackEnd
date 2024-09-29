const express = require('express');
const userRoutes = require('./routes/UserRoutes'); 
const pool = require('./Config/db'); 
require('dotenv').config();

const app = express();
const PORT = 3000;

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 미들웨어 설정
app.use(express.json()); 

// 사용자 라우터 등록
app.use('/api/users', userRoutes);

// 로그인 엔드포인트 
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 커넥션 풀에서 연결 가져오기
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ message: 'DB 연결 실패' });
    }

    // 사용자 정보 확인 쿼리
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
      connection.release(); // 사용 후 연결 반환

      if (error) {
        return res.status(500).json({ message: '서버 오류' });
      }

      if (results.length === 0) {
        // 아이디가 틀린 경우
        return res.status(401).json({ message: '아이디가 잘못되었습니다.' });
      }

      const user = results[0];

      // 비밀번호가 틀린 경우
      if (user.password_hash !== password) {
        return res.status(401).json({ message: '비밀번호가 잘못되었습니다.' });
      }

      // 로그인 성공 시 멘트
      return res.status(200).json({ message: `환영합니다, ${user.username}님!` });
    });
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`현재 ${PORT}번 포트에서 실행되고 있습니다!`);
});
