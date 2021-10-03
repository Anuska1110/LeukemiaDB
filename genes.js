const mongoose = require('mongoose');

const GeneSchema = mongoose.Schema({
    cnumber : String,
    gname : String,
    gloci : String
})


module.exports = mongoose.model('Genes',GeneSchema);
