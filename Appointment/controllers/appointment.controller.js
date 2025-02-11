
const appointmentService = require('../service/appointment.service')
const userService =require("../service/user.service")
const redis = require("../utils/redis")
const { DateTime } = require('luxon');
module.exports = {
    Booking  : async (req, res ) => {
        try {
            let {  medic_id , slot ,notes , date } = req.body
            let {username } = req.payload 
            let token = req.headers.authorization 
            let number_date = DateTime.fromISO(date).toFormat("yyyyMMdd")
            let key = `${slot};${number_date};${medic_id}`
            let resultAPI =  await userService.getUserAndMedic(username ,medic_id  , token )
            const user = [] 
            const medic = []
         //   console.log(resultAPI)
            await Promise.all(resultAPI.data.map( d => {
                 if( d.type  == '0') {
                    medic.push(d)
                 }  else {
                    user.push(d)
                 } 
             } )   )
         

            const book = {
                _id  : key , 
                user : {
                    username: username ,
                    fullname : user[0].firstname+ " "+ user[0].lastname ,
                    birthdate :  user[0].birthdate, 
                    phone : user[0].phone
                } ,
                medic: {
                    id : medic[0].username , 
                    fullname : medic[0].firstname+ " "+medic[0].lastname ,
                    specialization: "test"
                } ,
                notes : notes || "-" ,
                slot : slot ,
                date : date ,
                status : "confirmed"
            } 
          await redis.reserveSlot(key, book);
          const data  =  await appointmentService.Create(book)

            return res.status(200).send({"Message" : "Booking Success!" , "data" : data})
        } catch (error) {
            return res.status(500).send({"Message" : error.stack})
        }
        
    } ,
    getBookings : async (req , res) => {
        try {
            let result = await appointmentService.GetBookings()

            res.status(200).send({"Messsage" : "Book List" ,data : result})
        } catch (error) {
            return res.status(500).send({"Message" : error.message})
        }
    } ,
    getBookingByOne : async (req , res) => {
        try {
                let _id = req.params

            res.status(200).send({"Messsage" : "Book List"})
        } catch (error) {
            return res.status(500).send({"Message" : error.message})
        }
    }
}