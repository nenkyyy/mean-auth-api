/** 
 * @description global scope 
 * */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

/** 
 * @description app config 
 * */
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

/** 
 * @description routes 
 * */
const authentication = require('./src/routes/authentication');
const artist = require('./src/routes/artist');
app.use('/authentication', authentication);
app.use('/artist', artist);

/** 
 * @description app welcome 
 * */
app.get('/', (req, res, next) => {
  try { return res.status(200).send('What up!'); }
  catch (error) { return res.status(500).send(); }
});

/** 
 * @description port listener 
 * */
app.listen(process.env.port, () => {
  console.info(`app ready: http://localhost:${process.env.port}`);
});

/** 
 * @description minghodb connection 
 * */
mongoose.connect(process.env.mongodb_uri,
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => {
  console.info(`MongoDB connected:
    \n\t- Database: ${process.env.mongodb_uri}`);
}).catch(() => {
  console.info(`MongoDB connection failed:
    \n\t- Database: ${process.env.mongodb_uri}`);
});

