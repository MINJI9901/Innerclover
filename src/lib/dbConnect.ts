import mongoose from "mongoose";
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI!;

const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/ExpenseTracker');
    await mongoose.connect(uri);
    console.log("connected to db.");
  } catch (err) {
    console.log("Oppza, error occured!!!: ", err);
  }
};

export default dbConnection;
