// /services/user.service.js
const User = require('../modules/user.module');

async function createUser(data) {
  return await User.create(data);
}

async function getAllUsers() {
  return await User.find();
}

async function getUserByUsername(username) {
  return await User.findOne({ username });
}
async function getUserAndMedic (user_id , medic_id) {
  console.log(user_id , medic_id)
  return await User.aggregate( [
    {
      $match : { 
        username : {$in : [user_id ,medic_id ] } 
      }
    } 
  ]).exec()
  
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserAndMedic
  
};
