//Item controller that provides viewing functionality.
//Also provides CRUD functionality for admin user - the update and delete functions

const Item = require('../models/item-model');
const mongoose = require('mongoose');

const nodemailer = require('nodemailer')

const index = async (req, res) => {
  const query = await Item.find({}, function(err, datares) { 
    if (err) {
      res.status(404).send({
        message: 'error no items'
      })
    } else {
      res.send(datares);
    }
    
  });

  return res;

}

const createItem = (req, res) => {
  console.log("Test...");
  const { itemName, headline, description, category, postcode, firstName, lastName, phone, address, email, privacy, image, delivery } = req.body;

  const newItem = new Item({
    itemName,
    headline,
    description,
    category,
    postcode,
    firstName,
    lastName,
    phone,
    address,
    email,
    privacy,
    image,
    delivery
  });

  newItem.published = false;

  newItem.save()
    .then(() => res.json(newItem))
    .catch(err => res.status(400).json('Error: ' + err));


//for nodemailer  
      const output = `
        <p>You have a new item to be published</p>
        <h3>Details</h3>
        <ul>
          <li>Item Name: ${req.body.itemName}</li>
          <li>Headline: ${req.body.headline}</li>
          <li>Description: ${req.body.description}</li>
          <li>Category: ${req.body.category}</li>
          <li>Postcode: ${req.body.postcode}</li>
          <li>First Name: ${req.body.firstName}</li>
          <li>Last Name: ${req.body.lastName}</li>
          <li>Phone: ${req.body.phone}</li>
          <li>Address: ${req.body.address}</li>
          <li>Email: ${req.body.email}</li>
          <li>Privacy: ${req.body.privacy}</li>
          <li>Image: ${req.body.image}</li>
          <li>Delivery: ${req.body.delivery}</li>
          </ul>
       
      `;
      // setup email data with unicode symbols
      let mailOptions = {
        from: `"One Good street" <${process.env.EMAIL_USER}>`, // sender address
        to: "onegoodst@gmail.com", // list of receivers
        subject: `${req.body.itemName}`, // Subject line
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

}



const togglePublished = async (req, res) => {
  console.log('here')
  const foundItem = await Item.findById(req.body.id)
  const published = foundItem.published
  published ? foundItem.published = false : foundItem.published = true
  await foundItem.save()
  res.send(foundItem)
}


//admin functionality only - working
const editItem = (req, res) => {
  console.log("Edit id", req.body)
  
  Item.findById(req.params.id)
    .then(item => {
      item.itemName = req.body.itemName;
      item.headline = req.body.headline;
      item.description = req.body.description;
      item.category = req.body.category;
      item.postcode = req.body.postcode;
      item.firstName = req.body.firstName;
      item.lastName = req.body.lastName;
      item.phone = req.body.phone;
      item.address = req.body.address;
      item.email = req.body.email;
      item.privacy = req.body.privacy;
      item.delivery = req.body.delivery;
      item.image = req.body.image;
      item.published = req.body.published;

      item.save()
        .then(()=> res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}


//admin functionality only
const deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
};


const findOneItem = (req, res) => {
  console.log("Item id: ", req.params.id);

  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
};

//search by item category - work out how to do only partial words?????
const searchByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    let items = await Item.find({ category: category });
    res.json(items);
  }
  catch (err) { res.status(400).send('Error: ' + err); }
}



const searchByLocation = async (req, res) => {
  const { postcode } = req.params;
  try {
    let items = await Item.find({ postcode: postcode });
    res.json(items);
  }
  catch (err) { res.status(400).send('Error: ' + err); }
}




//this is search - using regex for any PARTIAL WORDS. use this for search category. 
// const searchByCategory = async (req, res) => {
//   const {category} = req.params;
//   // const regexpress = new RegExp(`^${name}$`);
//   Item.find({ "category": { "$regex": category, "$options": "i" }})
//   .then(category => res.json(category))
//   .catch(err => res.status(400).json('Error: ' + err));
// }


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



module.exports = { index, createItem, editItem, deleteItem, findOneItem, searchByCategory, searchByLocation, togglePublished }