const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comparingnumberSchema =new Schema({
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

const comparingnumber =  mongoose.model('comparingnumber',comparingnumberSchema);

module.exports = comparingnumber;