const userService = require('../service/user.service')
const authService = require('../service/authentication.service')
const { DateTime } = require('luxon');
module.exports = {
    Register : async (req , res ) => {
        try {
            const { username , password , firstname  , lastname , phone , type  , birthdate } = req.body
            
            if (!username || username == null || username =="" ) {
                return res.status(400).send({"Message" : " Bad Request "})
            }  
            const dtbirthdate = DateTime.fromFormat(birthdate, "yyyy-MM-dd").toISODate();
            const auth = await authService.createAuthen({username : username , passwordhash: password} )
            console.log(auth)
            const user = {
                username: username , 
                firstname : firstname , 
                lastname : lastname ,
                phone : phone , 
                type : type ,
                birthdate : dtbirthdate
            } 
            const u = await userService.createUser(user)
            console.log(auth)
            console.log(u)
            return res.status(200).send({"Message" : "User registered successfully"}) 
        } catch (error) {
            res.status(500).send({"Message" : error.message} )
        }
    } ,
    getUser : async (req, res ) => {
        try {
             const {username } = req.payload
                let resp = await userService.getUserByUsername(username)
                if( resp == null) { 
                    return res.status(400).send({"Message" : `${username} not found`})
                }
                res.status(200).send({
                    "Message" : "user" , 
                    "data" : resp
                })
        } catch (error) {
            return  res.status(500).send({"Message" : error.mssage} )
        }
    } , 
    getUserAndMedic : async (req , res ) => {
        try {
            //const {username } = req.payload
                const {user_id , medic_id }  = req.query
               let resp = await userService.getUserAndMedic(user_id ,medic_id )
               console.log(resp)
               if( resp == null || resp.length < 2) { 
                   return res.status(400).send({"Message" : `${user_id} not found`})
               }
               res.status(200).send({
                   "Message" : "user" , 
                   "data" : resp
               })
       } catch (error) {
           return  res.status(500).send({"Message" : error.message} )
       }
    }
} 