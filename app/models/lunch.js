const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var lunch = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    createdBy : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    description: {
        type : String
    },
    guest : {
        type : String
    },
    guests : [{ 
        type : String
    }], 
},{
    collection : 'Lunches'
})

module.exports = mongoose.model('Lunch', lunch);