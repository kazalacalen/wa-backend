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
app.get("/apartmanget", async (req, res) => {
  try {
    let db = await connect();
    let cursor = await db.collection("apartman").find();
    let result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja apartmana:", error);
    res.status(500).json({ error: "Greška prilikom dohvaćanja apartmana" });
  }
});


app.get("/bazenget", async (req, res) => {
  try {
    let db = await connect();
    let cursor = await db.collection("bazen").find();
    let result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja bazena:", error);
    res.status(500).json({ error: "Greška prilikom dohvaćanja bazena" });
  }
})

app.get("/dvoristeget", async (req, res) => {
  try {
    let db = await connect();
    let cursor = await db.collection("dvoriste").find();
    let result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja dvorista:", error);
    res.status(500).json({ error: "Greška prilikom dohvaćanja dvorista" });
  }
})

app.get("/igraonicaget", async (req, res) => {
  try {
    let db = await connect();
    let cursor = await db.collection("igraonica").find();
    let result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja igraonice:", error);
    res.status(500).json({ error: "Greška prilikom dohvaćanja igraonice" });
  }
})

app.get("/studioget", async (req, res) => {
  try {
    let db = await connect();
    let cursor = await db.collection("studio").find();
    let result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja studia:", error);
    res.status(500).json({ error: "Greška prilikom dohvaćanja studia" });
  }
})
app.listen(port, () => console.log(`Slušam na portu ${port}!`));
