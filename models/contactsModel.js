const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    phone_number:{
        type:String
    },
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