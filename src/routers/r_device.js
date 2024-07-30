import express from "express";
import { conn_mysql } from "../controllers/c_mysql.js";
import fs from "fs";
import { read as readmat } from "mat-for-js";
const router = express.Router();

//* matlab 데이터
router.get("/data", async (req, res) => {
  try {
    const [results] = await conn_mysql.query(
        `
      SELECT
      pipe_pressure.data1,
      pipe_pressure.data2
      FROM pipe_pressure
      ;
      `,
      []
    );
    res.send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// //* 데이터 등록
// router.post("/post-data", async (req, res) => {
//   const { data1, data2 } = req.body;

//   // 입력 검증
//   if (typeof data1 === 'undefined' || typeof data2 === 'undefined') {
//     return res.status(400).send("잘못된 요청: data1 또는 data2가 누락되었습니다.");
//   }

//   try {
//     await conn_mysql.query(
//       `
//       INSERT INTO pipe_pressure (data1, data2)
//       VALUES (?, ?)
//       `,
//       [data1, data2]
//     );
//     res.status(201).send("데이터가 성공적으로 추가되었습니다.");
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("내부 서버 오류");
//   }
// });

//* MATLAB 파일에서 데이터 읽기 및 데이터베이스에 삽입
router.post("/upload-mat-data", async (req, res) => {
  fs.readFile("C:\\Users\\jne32\\Desktop\\KETI_simulation\\matlab00.mat", null, async (err, data) => {
    if (err) {
      console.error("파일 읽기 오류:", err);
      return res.status(500).send("파일 읽기 오류");
    }

    try {
      const final = readmat(data.buffer);
      //console.log(final.data.pipe_pressure);

      let pipePressureValues = final.data.pipe_pressure;

      let sql = 'INSERT INTO pipe_pressure VALUES (?)';
  
      pipePressureValues.forEach((value) => {
        conn_mysql.query(sql, [value], (err, result) => {
                    if (err) {
                        console.error('데이터 삽입 오류:', err);
                        return;
                    }
                    console.log('데이터가 성공적으로 삽입되었습니다.', result);
                });
            });

      res.status(201).send("MAT 데이터가 성공적으로 삽입되었습니다.");
    } catch (e) {
      console.error(e);
      res.status(500).send("내부 서버 오류");
    }
  });
});



// //* 데이터 등록
// router.post("/post-data", async (req, res) => {
//   try {
//     const { data1, data2 } = req.body;
//     const [results] = await conn_mysql.query(
//       `
//     INSERT INTO pipe_pressure (data1, data2) VALUES
//     (?,?)
//     `,
//       [data1, data2]
//     );
//     res.json({ message: results });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Internal Server Error");
//   }
// });



// //* 유저수정
// router.post("/user-data-update", async (req, res) => {
//   try {
//     const { user_index, name, user_id, email, password, role } = req.body;
//     const [results] = await conn_mysql.query(
//       `
//     UPDATE user
//     SET 
//       user_id = ?,
//       user_name = ?,
//       password = ?,
//       email = ?,
//       role = ?
//     WHERE user_index = ?
//     `,
//       [user_id, name, password, email, role, user_index]
//     );
//     res.json({ message: results });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Internal Server Error");
//   }
// });

export { router };
