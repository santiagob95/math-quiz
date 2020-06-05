const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addsubstracthighscoreSchema =new Schema({
    username: {type: String, required: true }, 
    ownerID: {type: String, required: true, },
    score:{type: Number,  required:true}
}, {
    timestamps: true,
});

const addsubstractHighscore =  mongoose.model('addsubstractHighscore',addsubstracthighscoreSchema);

module.exports = addsubstractHighscore;