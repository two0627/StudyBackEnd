const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');

// 로그인 라우트 설정
router.post('/login', UserController.loginUser);

module.exports = router;
