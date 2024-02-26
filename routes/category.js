const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/categoryController.js')

router.post('/add-category', category_controller.createNewCategory);
router.get('/list-all-categories', category_controller.listAllCategories);

module.exports = router;
