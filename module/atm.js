const mongoose = require("mongoose");

main().then(()=>{
    console.log("connected databse");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/atm');
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