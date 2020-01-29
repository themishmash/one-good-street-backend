
const nodemailer = require('nodemailer')

//Nodemailer
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


//Get involved form

const involved = (req, res) => {

  const output = `
        <p>You have a new 'Get Involved' message </p>
        <h3>Details</h3>
        <ul>
          <li>First Name: ${req.body.firstName}</li>
          <li>Last name ${req.body.lastName}</li>
          <li>Address: ${req.body.address}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone: ${req.body.phone}</li>
          <li>Services: ${req.body.services}</li>
          <li>Comments: ${req.body.comments}</li>
          </ul>
       
      `;
  // setup email data with unicode symbols
  let mailOptions = {
    from: `"One Good street" <${process.env.EMAIL_USER}>`, // sender address
    to: "onegoodst@gmail.com", // list of receivers
    subject: `Get involved form - Services: ${req.body.services}`, // Subject line
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

}


//Contact us form

const contact = (req, res) => {

  const output = `
        <p>You have a new 'Contact Us' message </p>
        <h3>Details</h3>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email ${req.body.email}</li>
          <li>Message: ${req.body.message}</li>
          </ul>
       
      `;
  // setup email data with unicode symbols
  let mailOptions = {
    from: `"One Good street" <${process.env.EMAIL_USER}>`, // sender address
    to: "onegoodst@gmail.com", // list of receivers
    subject: `Contact Us Form ${req.body.message}`, // Subject line
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

}




module.exports = { involved, contact }