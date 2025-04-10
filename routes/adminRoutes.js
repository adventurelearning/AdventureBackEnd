const express = require('express');
const adminModel = require('../models/adminModel');
const contactModel=require('../models/contactsModel')
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const admin = await adminModel.findOne({ Email });

        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }

        if (admin.Password === Password) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/',async(req,res)=>{
    try{
        const contacts=await contactModel.find();
        res.send(contacts)
    }catch(err){
        console.log(err);
        
    }
})

module.exports = router;
