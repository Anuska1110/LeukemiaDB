const mongoose = require('mongoose');

const ChromoSchema = mongoose.Schema({
    cnumber : String,
    gname : String,
    gloci : String,
})


module.exports = mongoose.model('Chromo',ChromoSchema);
