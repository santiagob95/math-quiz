const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizQuestionSchema =new Schema({
    question: {type: String, required: true },
    dif:{type: Number, required: true},
    answers:  [
        {
            result:{type: Boolean, required: true},
            content: {type: String, required:true},
           
        },
        {
            result:{type: Boolean, required: true},
            content: {type: String, required:true},
            
        },
        {
            result:{type: Boolean, required: true},
            content: {type: String, required:true},
        }
    ]
    
})

const quizQuestion =  mongoose.model('quizQuestion',quizQuestionSchema);

module.exports = quizQuestion;