const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.route('/createUser').post(userController.createUser)
router.route('/getUserById/:userId').get(userController.getUserById)
router.route('/updateUser/:userId').put(userController.updateUser)
router.route('/deleteUser/:userId').patch(userController.deleteUser)

module.exports = router
