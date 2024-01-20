/** 
 * @description global scope 
 * */
const mongoose = require('mongoose');

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
    default: null
  },
  artCollection: [{
    type: String,
    default: null
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Artist', schema);