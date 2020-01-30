const express = require('express');
const router = express.Router();

const { request, reset } = require('../controllers/password-controller');

router.post('/request', request)
router.post('/reset', reset)

module.exports = router;