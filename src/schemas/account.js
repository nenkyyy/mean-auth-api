/** 
 * @description global scope 
 * */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** 
 * @description schema 
 * */
const schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokenCollection: [{
    type: String,
    default: null
  }]
}, {
  timestamps: true
});

/** 
 * @description at save 
 * */
schema.pre('save', function (next) {
  const account = this;

  if (!account.isModified('password')) return next();

  bcrypt.hash(account['password'], saltRounds, (error, hash) => {
    if (error) return next(error);

    account['password'] = hash;
    next();
  });
});

module.exports = mongoose.model('Account', schema);