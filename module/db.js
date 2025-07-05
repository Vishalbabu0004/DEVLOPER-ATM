const mongoose = require('mongoose');
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected mongoDB");
    }catch(err){
        console.log("connection failed " ,err);
    }
}
module.exports = connectDB;