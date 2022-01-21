const express = require('express');
const server = express();

const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // dotenv

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const db = require('./models').sequelize;
const passportConfig = require('./passport');

db.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

db.sync({
  alter: true,
}); // sequelize model sync() 수정하기

passportConfig();

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// front에서 받아온 data를 req.body안으로 넣어준다, json 형식으로
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: false })); // 세션 활성화
server.use(passport.initialize()); // passport 구동
server.use(passport.session()); // 세션 연결

server.get('/', (req, res) => {
  res.send('hello express in e도서관');
});

server.use('/user', userRouter);
server.use('/post', postRouter);
/* 이 사이에 보이지 않는 error 처리 미들웨어가 존재 */
server.listen(3065, () => {
  console.log('서버를 실행중입니다.');
});

/** 순서
* * postman 사용: get(가져오다), post(생성), put(전체수정), patch(부분수정), delete
* express router 분리하기

* * workbench로 시각화된 database 확인하기
* MySQL과 squelize 연결하기 (squelize는 MySQL을 조작할 수 있게 도와주는 역할을 한다)
* sequelize 모델 만들기
* sequelize 관계 설정하기
* sequelize sync + nodemon

* 회원가입 구현하기
* CORS 문제 해결하기
* passport로 로그인하기 (passport kakao, google)
* cookie && session과 전체 로그인 흐름 파악하기
* 로그인 문제 해결하기: attributes, include && exclude
* middleware로 router 검사하기

* 게시글, 댓글 작성하기
* credentials로 쿠키 공유하기
* 내 로그인 정보 매번 불러오기
* 게시글 불러오기
* 게시글 제거, 닉네임 변경

* 이미지 업로드를 위한 multer
* express.static middleware: 정적파일을 제공하기 위함
* queryString과 lastId 방식
*/