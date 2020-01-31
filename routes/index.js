//index for linking all routes

const express = require('express');
const router = express.Router();

router.use('/items', require('./item-routes'));
router.use('/users', require('./user-routes'));
router.use('/search', require('./search-routes'));

router.use('/send', require('./send-routes'));

router.use('/password', require('./password-routes'));

// router.get("/", require("../controllers/index"));

module.exports = router;
