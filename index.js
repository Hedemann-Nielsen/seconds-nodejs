import express from "express";
import dotenv from "dotenv";
import { SongRouter } from "./routes/song.router.js";

//import db from "./config/db.config.js";

//test på om den har fat i db.config.js - import ovenfor bruges
// db.query("SELECT title FROM song", (err, result) => {
// 	console.log(result);
// });

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Udvider app i index.js så vi kan læse form body data
app.use(express.urlencoded({ extended: true }));

app.use(SongRouter);

app.listen(port, () => {
	console.log(`server køre med port http://localhost:${port}`);
});
