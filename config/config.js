const mongoose=require('mongoose');
require('dotenv').config();
const MONGODB_URL=process.env.MONGODB_URL
console.log(MONGODB_URL);


async function connectDB(){
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("mondodb Connected");
    }catch(err){
        console.log(err);
        
    }
  
    
}

module.exports=connectDB