import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import connect from "./db.js";
import mongo from "mongodb";
import auth from "./auth.js";

import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/tajna", [auth.verify], (req, res) => {
  res.json({ message: "Ovo je tajna " + req.jwt.username });
});

app.post("/login", async (req, res) => {
  let user = req.body;

  try {
    let result = await auth.autenticateUser(user.username, user.password);
    res.json(result);
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
});
app.post("/admin", async (req, res) => {
  let user = req.body;

  try {
    let result = await auth.autenticateAdmin(user.username, user.password);
    res.json(result);
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
});

app.post("/register", async (req, res) => {
  let data = req.body;
  let id;

  try {
    id = await auth.registerUser(data);
    res.json({ id: id });
  } catch (e) {
    console.error(e);
    res.status(406).json({ error: e.message });
  }
});
app.post("/apartman", async (req, res) => {
  let data = req.body;

  data.datePosted = new Date().getTime(); 

  delete data._id;

  let db = await connect();

  let result = await db.collection("apartman").insertOne(data);

  console.log(result);

  res.json(data)
});
app.post("/igraonica", async (req, res) => {
  let data = req.body;

  data.datePosted = new Date().getTime(); 

  delete data._id;

  let db = await connect();

  let result = await db.collection("igraonica").insertOne(data);

  console.log(result);

  res.json(data)
});

app.post("/bazen", async (req, res) => {
  let data = req.body;

  data.datePosted = new Date().getTime(); 

  delete data._id;

  let db = await connect();

  let result = await db.collection("bazen").insertOne(data);

  console.log(result);

  res.json(data)
});

app.post("/studio", async (req, res) => {
  let data = req.body;

  data.datePosted = new Date().getTime(); 

  delete data._id;

  let db = await connect();

  let result = await db.collection("studio").insertOne(data);

  console.log(result);

  res.json(data)
});

app.post("/dvoriste", async (req, res) => {
  let data = req.body;

  data.datePosted = new Date().getTime(); 

  delete data._id;

  let db = await connect();

  let result = await db.collection("dvoriste").insertOne(data);

  console.log(result);

  res.json(data)
});

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
