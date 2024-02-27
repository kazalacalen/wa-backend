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


app.listen(port, () => console.log(`Slušam na portu ${port}!`));
