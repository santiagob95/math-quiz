const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionaddsubstractSchema =new Schema({
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

const Questionaddsubstract =  mongoose.model('Questionaddsubstract',questionaddsubstractSchema);

module.exports = Questionaddsubstract;