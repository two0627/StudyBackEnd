const userModel = require('../models/UserModel.js');

//로그인 함수
const loginUser = (req, res) => {
  const {id, password} = req.body; // 클라이언트가 입력한 아이디, 비밀전호


  userModel.getUserById(id, (error, user)=>{
    if(error){
      return res.status(500).send('서버 오류');
    }

    if(!user){
      return res.status(401).send('아이디가 존재하지 않습니다.')
    }

    if(user.password != password){
      return res.status(401).send('틀린 비밀번호 입니다.')

    }

    res.send('환영합니다, ${user.name}님!');
  });
};

module.exports = {loginUser};