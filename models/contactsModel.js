const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    Name:String,
    Email:String,
    Number:String,
    Sub:{
        type:String,
        default:"General Enquiry"
    },
    message:{
        type:String,
    }
},{timestamps:true}
);

module.exports=mongoose.model('Contacts',Schema)