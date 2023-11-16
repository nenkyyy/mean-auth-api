const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authentication = require('./src/routes/authentication');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use('/authentication', authentication);

app.get('/', (req, res, next) => { return res.send('What up!'); });

app.listen(process.env.PORT, () => {
  console.info(`[HTTP] server ready: 
  \n\t- Local: http://localhost:${process.env.PORT} \n`);
});

mongoose.connect(process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => {
  console.info(`MongoDB connected:
    \n\t- Database: ${process.env.MONGODB_URI}`);
}).catch(() => {
  console.info(`MongoDB connection failed:
    \n\t- Database: ${process.env.MONGODB_URI}`);
});

