const express = require('express'); // 웹 서버 구축을 위한 프레임워크
const bodyParser = require('body-parser'); // POST 요청을 파싱(데이터 정보를 특정한 형식으로 해석하고 구조화하는 작업)해 데이터 접근을 쉽게 해주는 미들웨어
const cors = require('cors'); // 보안상 출처 요청을 제어하고 리소스 공유 설정을 위한 미들웨어

const app = express();
const PORT = process.env.PORT || 3000;

//미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

//게시글 데이터 저장하는 배열
let posts = [];

//GET: 게시글 조회
app.get('/api/posts', (req, res)=>{
  res.json(posts);
});

//POST: 새 게시글 작성
app.post('/api/posts', (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});


//PUT: 게시글 수정
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex(post => post.id === parseInt(id));

  if (postIndex >= 0) {
      posts[postIndex] = { id: parseInt(id), ...req.body };
      res.json(posts[postIndex]);
  } else {
      res.status(404).json({ message: '포스트를 찾을 수 없습니다.' });
  }
});

// DELETE: 게시글 삭제
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter(post => post.id !== parseInt(id));
  res.status(204).send();
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중입니다. `);
});

