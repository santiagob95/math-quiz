const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comparingnumberhighscoreSchema =new Schema({
    username: {type: String, required: true }, 
    ownerID: {type: String, required: true, },
    score:{type: Number,  required:true}
}, {
    timestamps: true,
});

const comparingnumberHighscore =  mongoose.model('comparingnumberHighscore',comparingnumberhighscoreSchema);

module.exports = comparingnumberHighscore;