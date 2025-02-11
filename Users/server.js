
if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}  
const conf = require('./configs/index')
console.log(conf.setting.redis)
//require('dotenv').config()
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const server = require('http').createServer(app)
const morgan = require('morgan')
//const cors = require('cors')
// const corsMildleware = require('./Middleware/Cors')
const connectMongDB = require('./database/connection')
const connectRedis = require('./database/redis')
//const connectRedis = require('./db/redis.db')

app.use(express.json())
app.use(express.urlencoded( { extended:true }))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended:true} ))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));



// app.use(cors({
//     allowedHeaders : corsMildleware.allowedHeaders , 
//     origin : corsMildleware.allowedOrigins
// }))

connectRedis.connectRedis().then(() => {
    server.listen(conf.port, async () => {
 
        console.info(`---${conf.application_name}  ---`)
        console.info(`Process on the ${conf.node_env}  Env.`)
        app.use(require('./routes/index'))
        console.info(`Server started succesfully, running on port: ${conf.port}.`)
 

})

} )

connectMongDB.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    process.exit(0)
});
process.on('SIGINT', () => {
    process.exit(0)
})

// Graceful shutdown
process.on('SIGTERM', () => {

    console.warn(`Closing ${config.name} Service.`)
   // clearInterval(metricsInterval)
    server.close((err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.warn('Server closed.')

        connectMongDB.close(false, () => {
            console.log('MongoDb connection closed.')
            process.exit(0)
        })
    })
})




