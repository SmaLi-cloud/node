const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var {pool} = require('./src/db');



app.use('/', indexRouter);
app.use('/users', usersRouter);
// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// // 更新计数
// app.post("/api/count", async (req, res) => {
//   const { action } = req.body;
//   if (action === "inc") {
//     await Counter.create();
//   } else if (action === "clear") {
//     await Counter.destroy({
//       truncate: true,
//     });
//   }
//   res.send({
//     code: 0,
//     data: await Counter.count(),
//   });
// });

// // 获取计数
// app.get("/api/count", async (req, res) => {
//   const result = await Counter.count();
//   res.send({
//     code: 0,
//     data: result,
//   });
// });

// // 小程序调用，获取微信 Open ID
// app.get("/api/wx_openid", async (req, res) => {
//   if (req.headers["x-wx-source"]) {
//     res.send(req.headers["x-wx-openid"]);
//   }
// });

const port = process.env.PORT || 80;

async function bootstrap() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('数据库连接失败: ', err);
      return;
    }
    console.log('数据库连接成功');
  });

  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
