//karthik2003

//mongodb+srv://poojarykarthi79:karthik2003@cluster0.tz1cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require('mongoose')

function RunServer(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')

    } catch (error){
        console.log('Not Connected')
    }

}
module.exports=RunServer;