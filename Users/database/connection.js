// /database/connect.js



const mongoose = require("mongoose")
const config = require('../configs/index')
const mongo_uri = `mongodb://${config.setting.datebase.host}:${config.setting.datebase.port}/${config.setting.datebase.database_name}`
mongoose.Promise = global.Promise

mongoose.connect(mongo_uri)

const db = mongoose.connection;

db.on('connecting', function() {
    
    console.log('connecting to MongoDB...');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log(mongo_uri)
    console.log('MongoDB connected!');
});

db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
// db.on('disconnected', function() {
//     console.log('MongoDB disconnected!');
//     mongoose.connect(mongo_uri, {server:{auto_reconnect:false}});
// });
module.exports = db
//mongoose.connect(configs.dbSettings.url, {server:{auto_reconnect:true}});