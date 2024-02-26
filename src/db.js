
import { MongoClient, ServerApiVersion } from "mongodb";
let connection_string =
  "mongodb+srv://admin:admin@cluster0.6drawhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let db = null;
// eksportamo Promise koji resolva na konekciju
export default () => {
  return new Promise((resolve, reject) => {
    // ako smo inicijalizirali bazu i klijent je još uvijek spojen
    if (db && client.connected === true) {
      resolve(db);
    } else {
      client.connect((err) => {
        if (err) {
          reject("Spajanje na bazu nije uspjelo:" + err);
        } else {
          console.log("Database connected successfully!");

          db = client.db("apartmani");
          resolve(db);
        }
      });
    }
  });
};
