// /services/authen.service.js
const Authen = require('../modules/authentication.module');
const bcrypt = require('bcryptjs');
const configs = require('../configs/index')
const jwt = require('jsonwebtoken');
async function createAuthen(data) {
  return await Authen.create(data);
  
}

async function verifyPassword(username, plainPassword) {
  const authData = await Authen.findOne({ username });
  if (!authData) throw new Error('User not found');

  const isMatch = await bcrypt.compare(plainPassword, authData.passwordhash);
  return isMatch;
}

async function generateAccessToken(payload) {

  return jwt.sign(payload ,   configs.setting.Authorization.ACC_JWT_KEY , {expiresIn: configs.setting.Authorization.ACC_KEY_T})
}
async function generateRefreshToken(payload) {

  return jwt.sign(payload ,   configs.setting.Authorization.REFR_JWT_KEY , {expiresIn: configs.setting.Authorization.REFR_KEY_T})
}

async function verifyAccessToken(token) {
  return jwt.verify(token, configs.setting.Authorization.ACC_JWT_KEY);
}

async function verifyRefreshToken(token) {
  return jwt.verify(token, configs.setting.Authorization.REFR_JWT_KEY);
}


module.exports = {
  createAuthen,
  verifyPassword,
  verifyAccessToken , 
  verifyRefreshToken , 
  generateAccessToken , 
  generateRefreshToken
};
