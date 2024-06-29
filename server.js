require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection(process.env.COLLECTION_NAME);

    const cursor = collection.find();

    await cursor.forEach(doc => console.dir(doc));
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
