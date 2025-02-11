const authRoute = require('./auth.route')
const userRoute = require("./users.route")
const server = require('express').Router()

server.use("/auth" , authRoute)
server.use("/users" ,userRoute)
module.exports = server 