import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const url = process.env.MONGO_DB_URL;
  if (!url) {
    throw new Error("Add Mongo URI to .env.local");
  }

  const db = await mongoose.connect(url);
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
