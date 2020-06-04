const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionJ2Schema =new Schema({
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

const QuestionJ2 =  mongoose.model('QuestionJ2',questionJ2Schema);

module.exports = QuestionJ2;