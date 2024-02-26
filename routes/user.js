const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController.js')

router.post('/register', user_controller.createNewUser)
router.post('/login', user_controller.logInUser)

module.exports = router