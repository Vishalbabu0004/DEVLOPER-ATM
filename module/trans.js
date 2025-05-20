const mongoose = require("mongoose");

main().then(()=>{
    console.log("connected Transaction databse");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/atm');
}


const atmschema = new mongoose.Schema({
 
    history : {
      type : Number,
      require : true
    },
    type : {
      type : String,
      require : true
    },
    date : {
      type : Date,
      require : true
    }
  
   
});
const banktrans = mongoose.model('banktrans', atmschema);

module.exports = banktrans;