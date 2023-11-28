import express, { response } from "express";

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (request, response) => {
	console.log(request.query);
	response.send("Forspørgsel sendt");
});

app.listen(port, () => {
	console.log(`server køre med port http://localhost:${port}`);
});
