const server = require('express').Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/authMiddleware')
server.post("/login" , authController.Login)
server.put('/refresh/token' , authMiddleware ,  authController.RefreshToken)
module.exports = server