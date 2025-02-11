const server = require('express').Router()
const appointmentController = require('../controllers/appointment.controller')
const authMiddleware = require('../middleware/authMiddleware')
server.post("/booking" , authMiddleware ,  appointmentController.Booking)
server.get("/booking/list" , authMiddleware , appointmentController.getBookings)
module.exports = server