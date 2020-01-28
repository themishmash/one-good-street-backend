const express = require('express');
const router = express.Router();

const {involved} = require('../controllers/send-controller');

router.post('/involved', involved)

module.exports = router;