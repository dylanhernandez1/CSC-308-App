import express from "express";
import cors from "cors";

//Initialize app and users list
const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

//For Cross-Origin Resource Sharing and json
app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
	//Find user by name logic
	return users["users_list"].filter(
		(user) => user["name"] === name
	);
};

const findUserById = (id) => { 
	//Find user by id logic (unique)
	return users["users_list"].find((user) => user["id"] === id);
};

const findUserByIdAndJob = (name, job) => {
	//Find users by name and job logic
	return users["users_list"].filter(
		(user) => user["name"] === name && user["job"] === job
	);
};

const findUserByJob = (job) => {
	//Find users by job logic
	return users["users_list"].filter(
		(user) => user["job"] === job
	);
};

const addUser = (user) => {
	//Add user to list
	users["users_list"].push(user);
	return user;
};

const deleteUser = (user) => {
	//Delete user from list
	users["users_list"].splice(users["users_list"].indexOf(user), 1);
};

app.post("/users", (req, res) => {
	//Handle post request (adding a user)
	const userToAdd = req.body;
	userToAdd["id"] = `${Math.random()}`; //Make id a string for consistency
	addUser(userToAdd);
	res.status(201).send(userToAdd);
});

app.get("/", (req, res) => {
	//Default 'home' page
	res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
	//Get user by id logic
	const id = req.params["id"];
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	}else {
		deleteUser(result);
		res.send(result);
	}
});

app.delete("/users/:id", (req, res) => {
	//Delete user by id logic
	const id = req.params["id"];
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	}else {
		//Delete user here
		deleteUser(result);
		res.status(204).send();
	}
});

app.get("/users", (req, res) => {
	//Get users (with optional queries for specific name and/or job)
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined && job != undefined){
		let result = findUserByIdAndJob(name, job);
		result = { user_list: result };
		res.send(result);
	}else if (name != undefined) {
		let result = findUserByName(name);
		result = { users_list: result };
		res.send(result);
	}else if (job != undefined) {
		let result = findUserByJob(job);
		result = { users_list: result };
		res.send(result);
	}else {
		res.send(users);
	}
});

app.listen(port, () => {
	//Listening to port
	console.log(
		`Example app listening at http://localhost:${port}`
	);
});
