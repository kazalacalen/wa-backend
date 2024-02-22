import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        console.log('Uspješno povezivanje na MongoDB!');
        return client.db('apartmani');
    } catch (err) {
        console.error('Došlo je do greške prilikom spajanja na MongoDB:', err);
        throw err;
    }
};

export default dbConnect;
