// /modules/user.module.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: false },
  birthdate : {type : Date  , required: true } ,
  type: { type: String, required: true, enum: ['1', '0'] }, // 1 = general, 0 = medico
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
