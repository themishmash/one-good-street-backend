const nodemailer = require('nodemailer')
const { uuid } = require('uuidv4');
const Request = require('../models/request-model');
const User = require('../models/user-model')



const request = async (req, res) => {
  const {email} = req.body;
  const doc = await User.findOne({email:email})
  .then(doc => {
    if (doc) {
      const uniquekey = uuid();
      const someDate = new Date();
      const numberOfDaysToAdd = 1;
      const expirydate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

      const newRequest = new Request ({
        email,
        uniquekey,
        expirydate
      })

      console.log(expirydate);

      newRequest.save()
      .then(() => res.json('New request added'))
      .catch(err => res.status(400).json('Error: ' + err));

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_USER_PASS
        }
      });

        const output = `
              <p>Click the following link to reset your password </p>
              <h3>Details</h3>
              <ul>
                <a href="${process.env.NETLIFY_URL}" + "/password/reset/${uniquekey}">Click here!</a>
              </ul>
            `;
        // setup email data with unicode symbols
        let mailOptions = {
          from: `"One Good street" <${process.env.EMAIL_USER}>`, // sender address
          to: email, 
          subject: `Password Reset`, // Subject line
          text: "Example", // plain text body
          html: output // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.status(200).send("your message has been sent");
        });
      
    } else {
      return res.status(400).json({success: false, message: "I can't find you."});
    }
  })
}

const reset = async (req, res) => {
  const {password, uniquekey} = req.body;
  console.log("We are here...");
  await Request.findOne({uniquekey: uniquekey})
      .then(doc => {
        const NowDay = new Date().getTime()
        console.log(NowDay);
        console.log(doc.expirydate.getTime());
        if (NowDay < doc.expirydate.getTime()) {
       
          console.log(doc.email);
          
          console.log("found the unique key");
          User.findOne({email: doc.email})
          .then(user=>{
            console.log(user);
            console.log(password);
            user.setPassword(password);
            
            user.save()
            .then(()=>{
              console.log("Updated the password.");
              res.status(200).json({success: true, message: "Successfully changed your password."});
            })
            .catch(err=>{
              console.log(err);
              res.status(400).json({success: false, message: "Failed miserably...."})
            });
            
          })
      .catch(err => res.status(400).json('Error: ' + err));
    } else {
      res.status(400).json('Error: Your unique key has expired!!!')
    }
  })
}


module.exports = { request, reset }

