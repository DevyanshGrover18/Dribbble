const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true},
    email : {type : String, required : true},
    location : {type : String},
    img : {type : String}
});

module.exports = mongoose.model('users', userSchema)