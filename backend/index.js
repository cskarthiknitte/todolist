// entry point for express
//const cors = require('cors');
//const singupRouter = require('./routes/singupRoutes');

require('dotenv').config();
const express=require('express');
const RunServer = require("./Database/connection");
const cors = require('cors');
const Router = require('./Routes/todoRouter');

const app=express();
const port= process.env.PORT || 3000;


// json: transmitting the data b/w  client and server
app.use(express.json())
app.use(cors())

RunServer()

app.use('/todolist',Router)



//app.use('/api/user',singupRouter)

//backend port num:3000 , frontend port no:5173
//to connect that we are using cors.
//cd backendapp.use(cors())


//app.use('/user',userRouter)
//app.use('/contact',contactRouter)

app.listen(port, ()=>{
    console.log(`server is running on ${port} port!`)
})