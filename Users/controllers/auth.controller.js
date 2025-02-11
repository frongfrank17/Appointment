const AuthService = require('../service/authentication.service')
const redis = require('../utils/redis')
module.exports = {
    Login : async (req , res ) => {
        try {
            const { username , password } = req.body
            const isMatch =   await AuthService.verifyPassword(username , password)
            if (isMatch == false) {
                return res.status(401).send({ "Message" : " Incorrect username passoword !"} )
            }  
            const payloadAccessToken = {
                username : username ,
                type : "AccessToken"
            } 
            const payloadrefreshToken = {
                username : username ,
                type : "AccessToken"
            }            
            const accessToken = await AuthService.generateAccessToken(payloadAccessToken)
            const refreshToken = await AuthService.generateRefreshToken(payloadrefreshToken)
            const store = await redis.storeSession(accessToken ,refreshToken )
            console.log(store)
            return res.status(200).send({"Message" : "Login Success" , "accessToken"  :accessToken , "refreshToken" : refreshToken }) 
            
        } catch (error) {
            res.status(500).send({"Message" : error.message} )
        }
    } ,
    RefreshToken : async (req ,res) => {
            try {
                
            } catch (error) {
                res.status(500).send({"Message" : error.mssage} )
            }
        
    }
} 