const appointmentModule = require("../modules/appontment.module")
module.exports =  {
    Create : async (payload) => {
        let result = await appointmentModule.create(payload)
        return result
    } ,
    CustomeGetAppointmentFindOne : async (username) => {
        let result = await appointmentModule.aggregate([
            {
                $match : {
                    "user.username" : username
                } 
            }
        ]).exec()
        return result
        
    }
} 