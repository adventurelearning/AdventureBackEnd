const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./config/config');
const contactRouter=require('./routes/contactRouter');
const adminRouter=require('./routes/adminRoutes')
require('dotenv').config();

connectDB();

const PORT=process.env.PORT

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/contacts',contactRouter)
app.use('/api/admin',adminRouter)


app.get('/',(req,res)=>{
    res.send("hiiiiiiiii")
})



app.listen(PORT,console.log(`Server is running at ${PORT}`))