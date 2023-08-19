const mongoose = require('mongoose');
const mongouri = 'mongodb+srv://Myfood:sanjaynagar@cluster0.4ltd4ut.mongodb.net/MyFoodmern?retryWrites=true&w=majority';
const mongodb = async() => {
     mongoose.set('strictQuery',true);
    await mongoose.connect(mongouri, {useNewUrlParser:true},async(err,res) => {
        if(err){
            console.log("---",err);
        }else{
        console.log("connected");
        const fetch_data = await mongoose.connection.db.collection("foodData");
        fetch_data.find({}).toArray(async function(err,data){
            const foodCategory = await mongoose.connection.db.collection("foodCategory");
           foodCategory.find({}).toArray(function(err,catData){
            if(err){
                console.log(err);
            }else{
                global.food_item=data;
                global.foodCategory=catData;
             //   console.log(data,catData);
            }
           })
        })
        }
    });
}
module.exports = mongodb;