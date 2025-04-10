const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    Name:String,
    Email:String,
    Number:String,
    Course:String,
    AnyQuerys:String,
},{timestamps:true}
);

module.exports=mongoose.model('Contacts',Schema)