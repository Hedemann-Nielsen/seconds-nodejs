import express from "express";
import dotenv from "dotenv";
import db from "../config/db.config";
dotenv.config();

const app = express();

// Router
app.get("/", (request, response) => {
	console.log(request.query);
	response.send("Forside");
});

// Sangliste - med GET parameter eksempel
app.get("/songs", (req, res) => {
	db.query(
		`	SELECT s.id, s.title, a.name
			FROM song s
			JOIN artist a
			ON s.artist_id = a.id`,
		(error, result) => {
			if (error) {
				console.error(error);
			} else {
				res.json(result);
			}
		}
	);
});

// Sangdetaljer - med URL parameter
app.get("/songs/:id([0-9]*)", (req, res) => {
	// Destructure assignment
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

// Opret ny sang
app.post("/songs/search", (req, res) => {
	const keyword = req.query.keyword || req.body.keyword;
	res.send("Sange - Opret ny sang");
});

// 404
app.get("*", (req, res) => {
	res.send("Siden du leder efter, blev ikke fundet");
});

app.listen(process.env.PORT, () => {
	console.log(`Server kører på port http://localhost:${process.env.PORT}`);
});
