const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();


const PORT = process.env.PORT || 5000;

const app = express();

//Mongoose

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }

console.log("before mongoose")
mongoose.connect(process.env.DB_URL, dbConfig, (err) => {
    if (err)
        console.error("Error ❌");
    else
        console.log("Connected to db ✅");

});

app.use(express.json());
app.use(cors());

//Connecting the routes
//app.use(require('./routes/index'));

console.log(process.env.DB_URL);

app.listen(PORT,
    () => console.log(`Listening on port ${PORT}`)
);

///why do i have to have mongodb in .env for it to work????