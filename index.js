//Express framework required for nodeJS
//Mongoose required managing relationships between data, provides schema validation and to translate between objects in code and the representation of those objects in MongoDB.
//Cors required so allows cross-domain communication from the browser. 
//Dotenv used to store passwords in .env files


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
// const creds = require('dotenv').config();
// const nodemailer = require('nodemailer');

=======
const morgan = require('morgan');
>>>>>>> 84be92d6b40095f22272b50e360ce1bf8b6c1f82

require('dotenv').config();


const PORT = process.env.PORT || 5000;

const app = express();

//Mongoose

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }


mongoose.connect(process.env.DB_URL, dbConfig, (err) => {
    if (err)
        console.error("Error ❌");
    else
        console.log("Connected to db ✅");

});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Connecting the routes
app.use(require('./routes/index'));



app.listen(PORT,
    () => console.log(`Listening on port ${PORT}`)
);

///why do i have to have mongodb in .env for it to work????

//START CODE FOR EMAIL





// const transport = {
//     host: 'smtp.example.com', // Don’t forget to replace with the SMTP host of your provider
//     port: 587,
//     auth: {
//         user: creds.USER,
//         pass: creds.PASS
//     }
// }

// const transporter = nodemailer.createTransport(transport)

// transporter.verify((error, success) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Server is ready to take messages');
//     }
// });

// router.post('/send', (req, res, next) => {
//     const name = req.body.name
//     const email = req.body.email
//     const message = req.body.message
//     const content = `name: ${name} \n email: ${email} \n message: ${message} `

//     const mail = {
//         from: name,
//         to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  // Change to email address that you want to receive messages on
//         subject: 'New Message from Contact Form',
//         text: content
//     }

//     transporter.sendMail(mail, (err, data) => {
//         if (err) {
//             res.json({
//                 status: 'fail'
//             })
//         } else {
//             res.json({
//                 status: 'success'
//             })
//         }
//     })
// })