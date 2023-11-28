import express, { response } from "express";
import dotenv from "dotenv";
import db from "./config/db.config.js";

//test på om den har fat i db.config.js
// db.query("SELECT title FROM song", (err, result) => {
// 	console.log(result);
// });

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (request, response) => {
	console.log(request.query);
	response.send("Forspørgsel sendt");
});
app.get("/songs", (req, res) => {
	db.query(
		`	SELECT s.id, s.title, a.name
			FROM song s
			JOIN artist a
			ON s.artist_id = a.id`,
		(error, result) => {
			res.json(result);
		}
	);
});

app.get("/songs/:id([0-9]*)", (req, res) => {
	const { id } = req.params;
	const sql = `	
	SELECT s.id, s.title, s.artist_id, a.name AS artist_name, s.content
	FROM song s
	JOIN artist a
	ON s.artist_id = a.id
	WHERE s.id = ${id}
	`;
	db.query(sql, (error, result) => {
		res.json(result);
	});
});

app.listen(port, () => {
	console.log(`server køre med port http://localhost:${port}`);
});
