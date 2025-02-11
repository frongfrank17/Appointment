// /modules/authen.module.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authenSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, ref: 'User' },
  passwordhash: { type: String, required: true },
}, { timestamps: true });

// Hash the password before saving
authenSchema.pre('save', async function (next) {
  if (!this.isModified('passwordhash')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordhash = await bcrypt.hash(this.passwordhash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Authen', authenSchema);
