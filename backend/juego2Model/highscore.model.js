const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const J2highscoreSchema =new Schema({
    username: {type: String, required: true }, 
    ownerID: {type: String, required: true, },
    score:{type: Number,  required:true}
}, {
    timestamps: true,
});

const J2Highscore =  mongoose.model('J2Highscore',J2highscoreSchema);

module.exports = J2Highscore;