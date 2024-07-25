import express from "express";
import { conn_mysql } from "../controllers/c_mysql.js";
const router = express.Router();



// //* 유저등록
// router.post("/user-data", async (req, res) => {
//   try {
//     const { name, user_id, email, password, role } = req.body;
//     const [results] = await conn_mysql.query(
//       `
//     INSERT INTO user (user_id, user_name, password, email, role) VALUES
//     (?,?,?,?,?)
//     `,
//       [user_id, name, password, email, role]
//     );
//     res.json({ message: results });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Internal Server Error");
//   }
// });

//* 유저 데이터
router.get("/", async (req, res) => {
  try {
    const [results] = await conn_mysql.query(
      `
    SELECT *
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
