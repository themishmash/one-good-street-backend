const express = require('express');
const router = express.Router();
const { searchByCategory, searchByLocation } = require("../controllers/item-controller");

//here we are going to create routes
router.get("/items/category/:category", searchByCategory);
router.get("/items/postcode/:postcode", searchByLocation);


module.exports = router;