const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionJ3Schema =new Schema({
    question: {type: String, required: true },
    dif: {type:Number,required:true},
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

const QuestionJ3 =  mongoose.model('QuestionJ3',questionJ3Schema);

module.exports = QuestionJ3;