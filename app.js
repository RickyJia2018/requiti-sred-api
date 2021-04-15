'use strict';

const config = require('./config');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
// app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const connectDB = async () => {
  let dbURL = process.env.NODE_ENV == 'dev'? config.mongo_url_dev : config.mongo_url_docker;
  const conn = await mongoose.connect(dbURL, config.connect_options);
  console.log(`MongoDB Connected`);
}

connectDB();
app.get('/', (req, res) => {
  res.json({msg:'requiti API server.'})
});


const port = 5000;

app.listen(port, () => console.log('Server running...'));
