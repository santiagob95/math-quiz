const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizHighscoreSchema =new Schema({
    username: {type: String, required: true }, 
    ownerID: {type: String},
    score:{type: Number,  required:true}
}, {
    timestamps: true,
});

const quizHighscore =  mongoose.model('quizHighscore',quizHighscoreSchema);

module.exports = quizHighscore;