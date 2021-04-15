'use strict';

const config = require('./config');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');

const app = express();
dotenv.config();
// app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
const connectDB = async () => {
  // let dbURL = process.env.NODE_ENV == 'dev'? config.mongo_url_dev : config.mongo_url_docker;

  let dbURL = config.mongo_url_dev;
  const conn = await mongoose.connect(dbURL, config.connect_options);
  console.log(`MongoDB Connected`);
}

connectDB();

app.use('/graphql',graphqlHTTP({
    schema: graphqlSchema, graphiql:true
}));

app.get('/', (req, res) => {
  res.json({msg:'This is requiti API server. Please go to /graphql'})
});


const port = 5000;

app.listen(port, () => console.log('Server running...'));
