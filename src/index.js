// index.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let connection_string = 'mongodb+srv://admin:admin@cluster0.6drawhd.mongodb.net/?retryWrites=true&w=majority';
let client = new MongoClient(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

// Povezivanje na MongoDB
(async () => {
  try {
    await client.connect();
    db = client.db('apartmani');
    console.log('Uspješno povezivanje na MongoDB!');
  } catch (err) {
    console.error('Došlo je do greške prilikom spajanja na MongoDB:', err);
  }
})();

// Endpoint za registraciju korisnika
app.post('/SignUp', async (req, res) => {
  const { username, password, arrivalDate, departureDate } = req.body;

  try {
    await db.collection('korisnici').insertOne({ username, password, arrivalDate, departureDate });
    res.status(201).send('Registracija uspješna');
  } catch (error) {
    console.error('Greška prilikom registracije korisnika:', error);
    res.status(500).send('Došlo je do greške prilikom registracije');
  }
});

// Endpoint za prijavu korisnika
app.post('/LoginPage', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.collection('korisnici').findOne({ username, password });

    if (user) {
      res.status(200).send('Prijava uspješna');
    } else {
      res.status(401).send('Pogrešno korisničko ime ili lozinka');
    }
  } catch (error) {
    console.error('Greška prilikom prijave korisnika:', error);
    res.status(500).send('Došlo je do greške prilikom prijave');
  }
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});
