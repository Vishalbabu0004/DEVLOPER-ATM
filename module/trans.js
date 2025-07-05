const mongoose = require("mongoose");

// main().then(()=>{
//     console.log("connected Transaction databse");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/atm');
// }


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