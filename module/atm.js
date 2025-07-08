require("dotenv").config();
const mongoose = require("mongoose");



async function main() {
    try{
        await mongoose.connect(process.env.ATM_URL);
        console.log("connected mongodb ATM databse");
    }catch(err) {
        console.log("connecting error",err);
    } 
}

main();


const atmschema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    password : {
        type : Number,
        require:true,
        unique : true
    },
    totalbalance :{
        type:Number,
        require:true
    },
   
});
const bank = mongoose.model('bank', atmschema);

module.exports = bank;