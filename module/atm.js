const mongoose = require("mongoose");

// connectDB().then(()=>{
//     console.log("connected databse");
// })
// .catch(err => console.log(err));

// async function connectDB() {
//   await mongoose.connect(process.env.MONGO_URL);
// }

const atmConnection = mongoose.createConnection(process.env.ATM_DB, {
        useNewUrlParser : true,
        useUnofiedTopology : true,
})


const atmSchema = new mongoose.Schema({
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
const bank = atmConnection.model('bank', atmSchema);

module.exports = bank;