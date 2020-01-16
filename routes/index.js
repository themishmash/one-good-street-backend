const express = require('express');
const router = express.Router();

router.use('/items', require('./item-routes'));

// router.get("/", require("../controllers/index"));

module.exports = router;