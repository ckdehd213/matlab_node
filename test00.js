// import fs from "fs";
// import { read as readmat } from "mat-for-js";
// import mysql from "mysql2";

// // const connection = mysql.createConnection({
// //    host: 'localhost',
// //    user: 'root',
// //    password: '1234',
// //    database: 'mydatabase' 
// // });

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3311',
//     user: 'root',
//     password: 'secret',
//     database: 'mydb' 
//  });

// // MySQL에 연결
// connection.connect((err) => {
//     if (err) {
//         console.error('데이터베이스 연결 오류:', err);
//         return;
//     }
//     console.log('데이터베이스에 연결되었습니다.');
// });



// fs.readFile("C:\\Users\\jne32\\Desktop\\KETI_simulation\\matlab00.mat", null, (err, data) => {
//     if (err) {
//         console.error("파일 읽기 오류:", err);
//         return;
//     }
//     try {

//     let final = readmat(data.buffer);
//     console.log(final.data.pipe_pressure);
//     console.log(final.data.pipe_pressureCopy);

//     let pipePressureValues = final.data.pipe_pressure;
//     //let pipePressureValues2 = final.data.pipe_pressureCopy;

//     let sql = 'INSERT INTO pipe_pressure VALUES (?)';

//     pipePressureValues.forEach((value) => {
//         connection.query(sql, [value], (err, result) => {
//             if (err) {
//                 console.error('데이터 삽입 오류:', err);
//                 return;
//             }
//             console.log('데이터가 성공적으로 삽입되었습니다.', result);
//         });
//     });

        
//     } catch (error) {
//         console.error("MAT 파일 처리 오류:", error);
//     } finally {
//         connection.end(); // 연결 종료
//     }

// });
