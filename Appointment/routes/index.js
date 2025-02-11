const appointmentRoute = require('./appointment.route')

const server = require('express').Router()

server.use("/appointment/" , appointmentRoute)

module.exports = server 