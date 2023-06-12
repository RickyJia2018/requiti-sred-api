'use strict';

const config = require('./config');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const paginate = require('express-paginate');
const { analysisToken } = require('./util/tokenUtil');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const app = express();
const s3 = new AWS.S3({
  accessKeyId: 'AKIARWYWXN2S2457J3DZ',
  secretAccessKey: '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'
})

const mailgun = require("mailgun-js");

dotenv.config();
// app.set('view engine', 'ejs');
app.use(paginate.middleware(10, 20));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  // let dbURL = process.env.NODE_ENV == 'dev'? config.mongo_url_dev : config.mongo_url_docker;

  let dbURL = config.mongo_url_docker;
  const conn = await mongoose.connect(dbURL, config.connect_options);
  console.log(`MongoDB Connected`);
}
connectDB();

// 配置跨域
// app.all('*', function(req, res, next) {
//   var allowedOrigins = ['https://app.requiti.com', 'http://app.requiti.com', 'http://api.requiti.com'];
//   var origin = req.headers.origin;
//   if(allowedOrigins.indexOf(origin) > -1){
//       res.header('Access-Control-Allow-Origin', origin);
//   }
//   // res.setHeader('Access-Control-Allow-Origin', "*");

//   res.header("Access-Control-Allow-Credentials", "true");
//   // authorization, x-token  token
//   // token-from   admin/app
//   res.header("Access-Control-Allow-Headers", "Content-Type, Access-Token, authorization, Authorization");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   next();
// });
app.use(cors());
// app.use(cors({
//   origin: 'http://app.requiti.com'
// }));
app.use(analysisToken);
app.use('/graphql',graphqlHTTP({
    schema: graphqlSchema, graphiql:true
}));

app.get('/', (req, res) => {
  res.json({msg:'This is requiti API server. Please go to /graphql'})
});

const storage = multer.memoryStorage({
  destination: function(req,file,callback){callback(null,'')}
})
const upload = multer({storage}).single('file');

app.post('/upload',upload, function (req, res, next) {
  if(!req.verifiedUser) {
    res.status(400).send({data: "Unauthorized"})
  }else{
    let myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];
    const params = {
      Bucket: "requiti",
      Key: `${uuid()}-file-name-${req.file.originalname}`,

      // Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    }
    s3.upload(params,(error,data)=>{
      if(error){
        res.status(500).send(error)
      }
      res.status(200).send({data: data})
    })
  }

  
});

app.post('/invite-user',function(req,res){
  if(!req.verifiedUser) {
    res.status(400).send({data: "Unauthorized"})
  }else{
    const DOMAIN = 'app.requiti.com';
    const mg = mailgun({apiKey: config.MailGun_API, domain: DOMAIN});
    const data = {
    from: 'Requiti Team <NO-Reply@requiti.com>',
    to: req.body.email,
    subject: 'Platform Invitation',
    html: `<p>Greetings,</p><p>You are invited to join ${req.body.company_name}.</p><a href="http://app.requiti.com/authentication/Register?company_id=${req.body.company_id}&role_id=${req.body.role_id}">Accept Invitation</a>`
    };
    mg.messages().send(data, function (error, body) {
      if(error){
        res.send({
          error: error
        })
      }else{
        res.send({
          success: body
        })
      }
    
    });
  } 

})

app.post('/send-email',function(req,res){
  if(!req.verifiedUser) {
    res.status(400).send({data: "Unauthorized"})
  }else{
    const DOMAIN = 'app.requiti.com';
    const mg = mailgun({apiKey: config.MailGun_API, domain: DOMAIN});
    const data = {
    from: "Requiti Notification <robot@requiti.com>",
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.content };
    mg.messages().send(data, function (error, body) {
      if(error){
        res.send({
          error: error
        })
      }else{
        res.send({
          success: body
        })
      }
  });
}

})

const port = 5000;

app.listen(port, () => console.log('Server running...'));
