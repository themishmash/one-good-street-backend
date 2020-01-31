const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Connecting the routes
app.use(require('./routes/index'));

module.exports = app;

