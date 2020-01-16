const express = require('express');
const router = express.Router();

const { index, createItem, editItem, deleteItem, findOneItem } = require("../controllers/item-controller");

//here we are going to create routes

router.get('/', index);
router.post('/create', createItem);
router.put('/edit/:id', editItem)
router.delete('/delete/:id', deleteItem);
router.get('/:id', findOneItem);



module.exports = router;