const nodemailer = require('nodemailer')


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

const send = (req, res) => {
  const output = `
    <p>You have a new item to be published</p>
    <h3>Details</h3>
    <ul>  
      <li>First Name: ${req.body.firstName}</li>
      <li>Last Name: ${req.body.lastName}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      </ul>
   
  `;
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"One Good street" <process.env.EMAIL_USER>', // sender address
    to: "onegoodst@gmail.com", // list of receivers
    subject: `${req.body.title}`, // Subject line
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
    res.render("ContactForm", { msg: "Email has been sent" });
  });
};