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
        
    } , 
    GetBookingOne : async (_id) => {
            let result = await appointmentModule.findOne({_id :_id}).exec()
            return result
    } , 
    GetBookings : async () => {
        let result = await appointmentModule.aggregate([ 
            {
                $addFields: {
                  years: {
                    $dateDiff: {
                      startDate: "$user.birthdate",
                      endDate: "$$NOW",
                      unit: "year"
                    }
                  }
                }
              },
              // 2. Determine the last birthday by adding the full years to the birthdate.
              {
                $addFields: {
                  lastBirthday: {
                    $dateAdd: {
                      startDate: "$user.birthdate",
                      unit: "year",
                      amount: "$years"
                    }
                  }
                }
              },
              // 3. Calculate the number of complete months from the last birthday until now.
              {
                $addFields: {
                  months: {
                    $dateDiff: {
                      startDate: "$lastBirthday",
                      endDate: "$$NOW",
                      unit: "month"
                    }
                  }
                }
              },
            {
                $project :{
                    _id : 1 , 
                    
                        "fullname" : "$user.fullname" , 
                        "Tel" : "$user.phone" ,
                        birthdate : {$dateToString :  {format: "%Y-%m-%d", date: "$user.birthdate" } } ,
                        age: {
                            $concat: [
                              { $toString: "$years" },
                              " year ",
                              { $toString: "$months" },
                              " month"
                            ]
                          } ,
                    medic : 1 ,
                    date :1 , 
                    slot :1 , 
                    notes : 1
                 }
            }
        ]).exec()
        return result
    }
} 