require("dotenv").config();
const mongoose = require("mongoose");



async function main() {
    try{
        await mongoose.connect(process.env.TRANS_URL);
        console.log("connected mongodb TRANS databse");
    }catch(err) {
        console.log("connecting error",err);
    } 
}

main();

const atmschema = new mongoose.Schema({
  user : {
    type : [String],
    required: true
  },
 
    history : {
      type : Number,
      required : true
    },
    type : {
      type : String,
      required : true
    },
    date : {
      type : Date,
      required : true
    }
  
   
});
const banktrans = mongoose.model('banktrans', atmschema);

module.exports = banktrans;