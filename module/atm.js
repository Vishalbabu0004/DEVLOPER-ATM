const mongoose = require("mongoose");

connectDB().then(()=>{
    console.log("connected databse");
})
.catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect(MONGO_URL);
}


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