const server = require('express').Router()
const appointmentController = require('../controllers/appointment.controller')
const authMiddleware = require('../middleware/authMiddleware')
server.post("/booking" , authMiddleware ,  appointmentController.Booking)

module.exports = server