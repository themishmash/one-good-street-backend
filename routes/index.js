//index for linking all routes

const express = require('express');
const router = express.Router();

router.use('/items', require('./item-routes'));
router.use('/users', require('./user-routes'));


// router.get("/", require("../controllers/index"));

module.exports = router;