const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const highscoreSchema =new Schema({
    username: {type: String, required: true }, 
    ownerID: {type: String, required: true, },
    score:{type: Number,  required:true}
}, {
    timestamps: true,
});

const Highscore =  mongoose.model('Highscore',highscoreSchema);

module.exports = Highscore;