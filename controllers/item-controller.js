const Item = require('../models/item-model');
const mongoose = require('mongoose');

const index = async (req, res) => {
  const query = await Item.find({});
  query instanceof mongoose.Query;
  const docs = await query;
  res.send(docs);

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

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

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
      item.delivery = req.body.privacy;

      item.save()
        .then(()=> res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}



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

module.exports = { index, createItem, editItem, deleteItem, findOneItem }