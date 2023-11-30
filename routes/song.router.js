import express from "express";
import SongController from "../Controllers/song.controller.js";

const router = express.Router();

// Kalder instans af klassen SongController
const song = new SongController();

// List alle sange
router.get("/songs", (req, res) => {
	song.list(req, res);
});

// Hent sang detaljer
router.get("/songs/:id([0-9]*)", (req, res) => {
	song.details(req, res);
});

//Opretter ny sang
router.post("/songs", (req, res) => {
	song.create(req, res);
});

// søg efter en sang
router.get("/songs/search", (req, res) => {
	// Call the controller method for searching songs
	const songs = song.search(req, res);

	res.json(songs);
});

export { router as SongRouter };
