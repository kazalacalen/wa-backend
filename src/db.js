import { MongoClient } from 'mongodb';
import dbConnect from './db'; // ili odredište vašeg db.js modula


const registerUser = async (userData) => {
    const db = await dbConnect();

    try {
        await db.collection('korisnici').insertOne(userData);
        console.log('Korisnik uspješno registriran.');
    } catch (error) {
        console.error('Došlo je do pogreške prilikom registracije korisnika:', error);
        throw error;
    }
};

export { registerUser };
