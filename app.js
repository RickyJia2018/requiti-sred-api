'use strict';

const config = require('./config');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
console.log(process.env.MONGO_URL);
console.log(process.env.NODE_ENV);
// Connect to MongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`MongoDB Connected`);
}

connectDB();
app.get('/', (req, res) => {
  res.json({msg:'requiti API server.'})
});


const port = 5000;

app.listen(port, () => console.log('Server running...'));
