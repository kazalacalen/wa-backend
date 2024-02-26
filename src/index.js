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

// // Route for registering user
// app.post("/SignUp", async (req, res) => {
//   try {
//     const { username, password, name } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await db
//       .collection("users")
//       .insertOne({ username, password: hashedPassword, name });
//     res.status(201).send("Registration successful");
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).send("Registration failed");
//   }
// });

// // Route for authenticating user
// app.post("/LoginPage", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await db.collection("users").findOne({ username });
//     if (
//       user &&
//       user.password &&
//       (await bcrypt.compare(password, user.password))
//     ) {
//       const token = jwt.sign(
//         { username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1 week" }
//       );
//       res.status(200).json({ token });
//     } else {
//       res.status(401).send("Authentication failed");
//     }
//   } catch (error) {
//     console.error("Error authenticating user:", error);
//     res.status(401).send({ msg: "Authentication failed" });
//   }
// });

// // Route for accessing protected resource
// app.get("/protected", async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res
//       .status(200)
//       .send(
//         `Welcome ${decoded.username}! You have accessed protected resource.`
//       );
//   } catch (error) {
//     console.error("Error accessing protected resource:", error);
//     res.status(401).send("Access denied");
//   }
// });

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
