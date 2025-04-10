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
    courses:{
        type:String,
    },
    training_mode:{
        type:String,
    },
    message:{
        type:String,
    }
},{timestamps:true}
);

module.exports=mongoose.model('Register',Schema)