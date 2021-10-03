const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
  a : String,
  b : String,
  c: String,
  userID : String
})


module.exports = mongoose.model('Record',RecordSchema);
