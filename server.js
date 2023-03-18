//const mongoose = require("mongoose");
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

//require("dotenv").config();
//Simple connect
/*mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });*/

  const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;