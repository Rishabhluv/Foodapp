const moongose = require('mongoose');
const {Schema} = moongose;
const OrderSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    order_data:{
        type:Array,
        require:true
    }
});
module.exports = moongose.model('order',OrderSchema);