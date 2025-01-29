import express from "express";
import cors from "cors";
import userServices from "./user-services.js";



//Initialize app and users list
const app = express();
const port = 8000;

//For Cross-Origin Resource Sharing and json
app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
	//Handle post request (adding a user)
	const userToAdd = req.body;
	userToAdd["id"] = `${Math.random()}`; //Make id a string for consistency
	userServices.addUser(userToAdd);
	res.status(201).send(userToAdd);
});

app.get("/", (req, res) => {
	//Default 'home' page
	res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
	//Get user by id logic
	const id = req.params["id"];
	let result = userServices.findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	}else {
		userServices.deleteUser(result);
		res.send(result);
	}
});

app.delete("/users/:id", (req, res) => {
	//Delete user by id logic
	const id = req.params["id"];
	let result = userServices.findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	}else {
		//Delete user here
		userServices.deleteUser(result);
		res.status(204).send();
	}
});

app.get("/users", (req, res) => {
	//Get users (with optional queries for specific name and/or job)
	const name = req.query.name;
	const job = req.query.job;
	let result;
	if (name != undefined && job != undefined){
		result = userServices.findUserByIdAndJob(name, job);
		//result = { user_list: result };
		res.send(result);
	}else if (name != undefined) {
		result = userServices.findUserByName(name);
		//result = { users_list: result };
		res.send(result);
	}else if (job != undefined) {
		result = userServices.findUserByJob(job);
		//result = { users_list: result };
		res.send(result);
	}else {
		result = userServices.getUsers();
		result.then((result) => res.send({users_list: result}))
		.catch((error) => res.status(500).send("Internal Server Error"));
	}
});

app.listen(port, () => {
	//Listening to port
	console.log(
		`Example app listening at http://localhost:${port}`
	);
});
