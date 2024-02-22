import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let db;

// MongoDB connection
(async () => {
    try {
        const connection_string = process.env.DB_CONNECTION_STRING;
        const client = new MongoClient(connection_string);
        await client.connect();
        db = client.db('apartmani');
        console.log('Uspješno povezivanje na MongoDB!');
    } catch (err) {
        console.error('Došlo je do greške prilikom spajanja na MongoDB:', err);
    }
})();

// Route for registering user
app.post('/register', async (req, res) => {
    try {
        const { username, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('users').insertOne({ username, password: hashedPassword, name });
        res.status(201).send('Registration successful');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Registration failed');
    }
});

// Route for authenticating user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.collection('users').findOne({ username });
        if (user && user.password && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1 week' });
            res.status(200).json({ token });
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).send('Authentication failed');
    }
});

// Route for accessing protected resource
app.get('/protected', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send(`Welcome ${decoded.username}! You have accessed protected resource.`);
    } catch (error) {
        console.error('Error accessing protected resource:', error);
        res.status(401).send('Access denied');
    }
});

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
