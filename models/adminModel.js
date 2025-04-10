const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    Email:String,
    Password:String,
});

const adminmodel=mongoose.model('Admin',Schema)
const run=async()=>{
    await adminmodel.create({Email:"kiruthi@gmail.com",Password:"1234"})
}
// run()
module.exports=adminmodel