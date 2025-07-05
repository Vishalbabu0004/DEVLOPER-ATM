const mongoose = require("mongoose");

// main().then(()=>{
//     console.log("connected databse");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URL);
// }


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