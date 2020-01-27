const express = require('express');
const router = express.Router();
const { send } = require("../controllers/send-controller");

router.post("/send", send);

module.exports = router;