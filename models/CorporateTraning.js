const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    title:{
        type:String
    },
    phone_number:{
        type:String
    },
    company_name:{
        type:String,
    },

    message:{
        type:String,
    }
},{timestamps:true}
);

module.exports=mongoose.model('CorporateTraining',Schema)