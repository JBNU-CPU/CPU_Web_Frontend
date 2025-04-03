const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// 환경 변수 기본값 설정
const PORT = process.env.REACT_APP_PORT || 3000;
const URI = process.env.REACT_APP_URL || "localhost";

// SSL 인증서 파일 경로
const sslOptions = {
  key: fs.readFileSync("/home/ubuntu/privkey.pem"), // 개인 키 파일 경로
  cert: fs.readFileSync("/home/ubuntu/fullchain.pem"), // 인증서 파일 경로
};

// Express 앱 설정
const app = express();

// React 정적 파일 제공
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

// React로 모든 요청 처리
app.get("*", (req, res) => {
  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath, err => {
    if (err) {
      console.error("Failed to send index.html:", err);
      res.status(500).send("Server Error");
    }
  });
});

// HTTPS 서버 실행
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on ${URI}:${PORT}`);
});
