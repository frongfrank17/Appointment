const server = require('express').Router()

const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')
server.get("/" , authMiddleware , userController.getUser)
server.post("/register" , userController.Register)
server.get("/UserAndMedic"  , authMiddleware, userController.getUserAndMedic)
//server.delete("/device/delete/:vendor_id/:imei" )
module.exports = server