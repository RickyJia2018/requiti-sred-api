'use strict';

const config = require('./config');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const paginate = require('express-paginate');
const { analysisToken } = require('./util/tokenUtil');
const app = express();
dotenv.config();
// app.set('view engine', 'ejs');
app.use(paginate.middleware(10, 20));

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

// 配置跨域
app.all('*', function(req, res, next) {
  var allowedOrigins = ['https://app.requiti.com', 'http://app.requiti.com', 'http://api.requiti.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
      res.header('Access-Control-Allow-Origin', origin);
  }
  // res.setHeader('Access-Control-Allow-Origin', "*");

  res.header("Access-Control-Allow-Credentials", "true");
  // authorization, x-token  token
  // token-from   admin/app
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Token, authorization, Authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.use(analysisToken);
app.use('/graphql',graphqlHTTP({
    schema: graphqlSchema, graphiql:true
}));

app.get('/', (req, res) => {
  res.json({msg:'This is requiti API server. Please go to /graphql'})
});


const port = 5000;

app.listen(port, () => console.log('Server running...'));
