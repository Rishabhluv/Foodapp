const moongose = require('mongoose');
const {Schema} = moongose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
       // required:true
       default:Date.now
    }
});
module.exports=moongose.model('user',UserSchema)