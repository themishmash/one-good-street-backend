const Item = require('../models/item-model');
const mongoose = require('mongoose');

const index = async (req, res) => {
  const query = await Item.find({}, function(err, datares) { 
    if (err) {
      res.send(404)
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
}


//admin functionality only - working
const editItem = (req, res) => {
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

module.exports = { index, createItem, editItem, deleteItem, findOneItem, searchByCategory, searchByLocation }