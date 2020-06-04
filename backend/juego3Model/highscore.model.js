const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const J3highscoreSchema =new Schema({
    username: {type: String, required: true }, 
    ownerID: {type: String, required: true, },
    score:{type: Number,  required:true}
}, {
    timestamps: true,
});

const J3Highscore =  mongoose.model('J3Highscore',J3highscoreSchema);

module.exports = J3Highscore;