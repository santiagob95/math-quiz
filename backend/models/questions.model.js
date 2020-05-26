const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema =new Schema({
    question: {type: String, required: true },
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

const Question =  mongoose.model('Question',questionSchema);

module.exports = Question;