const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5
    }
},{
    collection : 'Users'
})

module.exports = mongoose.model('User', user);