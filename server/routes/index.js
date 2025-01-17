const express = require('express')

const controllers = require('../controllers')

const router = express.Router()

router.get('/leaveAccount', controllers.leave)
router.get('/', controllers.get)
router.post('/login', controllers.login)
router.get('/checkAuth', controllers.checkAuth)
router.post('/registration', controllers.registration),
router.get('/getUser', controllers.getUser)
router.post('/addNewLot', controllers.addNewLot)
router.post('/getLots', controllers.getLots)
router.post('/getData', controllers.getData)

module.exports = router