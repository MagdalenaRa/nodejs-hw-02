import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';

const { DB_USER, DB_PASS, DB_NAME } = process.env;

// 
console.log('DB_USER:', DB_USER);
console.log('DB_PASS:', DB_PASS);
console.log('DB_NAME:', DB_NAME);
console.log('MONGODB_URI:', `mongodb://magdalenaarams:e3kn1BiZx1io4XfE@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/db-contacts?retryWrites=true&w=majority`);

const MONGODB_URI = `mongodb://magdalenaarams:Magdalena1996@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/db-contacts?retryWrites=true&w=majority`;


if (!MONGODB_URI) {
  console.error("Brak MONGODB_URI w zmiennych środowiskowych");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Połączono z MongoDB");
  })
  .catch((error) => {
    console.error("Błąd podczas łączenia z MongoDB:", error.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

export default app;
