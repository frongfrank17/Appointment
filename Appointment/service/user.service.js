const configs = require("../configs/index")
const axios = require('axios')
module.exports  = {
    getUserAndMedic  : async (user_id , medic_id , token) => {
        try {
            // const url = `${configs.setting.External.API_USERS}/users/UserAndMedic?user_id=${user_id}&medic_id=${medic_id}`
            const url = configs.setting.External.API_USERS+'/users/UserAndMedic';

            // Define query parameters
            const params = {
              user_id: user_id,
              medic_id: medic_id
            };
        
            // Define headers including Authorization
            const headers = {
              'Authorization': token, // Replace with your actual token
              'Accept': 'application/json'
            };
        
            // Make the GET request with Axios
            const response = await axios.get(url, { params, headers });
        
           return response.data
        } catch (error) {
            return error
        }
    }
 }