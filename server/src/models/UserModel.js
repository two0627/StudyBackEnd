// controllers/userController.js
const User = require('./UserModel.js');

const login = (req, res) => {
  const { username, password } = req.body;

  // 데이터베이스에서 유저 찾기
  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: '서버 에러' });
    }
    
    // 아이디가 존재하지 않을 경우
    if (!user) {
      return res.status(400).json({ message: '아이디가 존재하지 않습니다.' });
    }

    // 비밀번호가 틀린 경우
    if (user.password_hash !== password) {
      return res.status(400).json({ message: '비밀번호가 잘못되었습니다.' });
    }

    // 로그인 성공, 유저에게 인사
    res.json({ message: `안녕하세요, ${user.username}님!` });
  });
};

module.exports = { login };
