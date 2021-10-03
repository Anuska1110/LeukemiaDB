const mongoose = require('mongoose');

const LukeSchema = mongoose.Schema({
    type : String,
    geneName : String
})


module.exports = mongoose.model('Luke',LukeSchema);
