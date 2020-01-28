const express = require('express');
const router = express.Router();

const { involved, contact } = require('../controllers/send-controller');

router.post('/involved', involved)
router.post('/contact', contact)

module.exports = router;