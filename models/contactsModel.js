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
    sub:{
        type:String,
        default:"General Enquiry"
    },
    message:{
        type:String,
    },
    status:{
        type:String,
        // default:"Pending"
    }
},{timestamps:true}
);

module.exports=mongoose.model('Contacts',Schema)