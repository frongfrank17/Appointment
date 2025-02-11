

const configs = require('../configs/index')
const jwt = require('jsonwebtoken');
async function verifyAccessToken(token) {
  return jwt.verify(token, configs.setting.Authorization.ACC_JWT_KEY);
}
module.exports = {

    verifyAccessToken 

  };
