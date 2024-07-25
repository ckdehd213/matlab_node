import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

let sitename = "";
if (process.env.SITENAME) {
  sitename = process.env.SITENAME;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpport = 3001;

app.use(cookieParser());
/* PayloadTooLargeError: request entity too large 에러 방지용 */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.use("/static", express.static(__dirname + "/src/static"));

app.use(express.static(__dirname + "/templates"));

import { router as r_device } from "./src/routers/r_device.js";
app.use("/", r_device);

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

//* 메인페이지
app.get("/main", (req, res) => {
    res.render("main.ejs");
  });

  app.listen(httpport, () => {
    console.log(`web on port ${httpport}...`);
  });
  