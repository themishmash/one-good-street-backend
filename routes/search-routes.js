const express = require('express');
const router = express.Router();
const { searchByCategory } = require("../controllers/item-controller");

//here we are going to create routes
router.get("/items/:category", searchByCategory);
// router.get("/item/:location", searchByLocation);

module.exports = router;