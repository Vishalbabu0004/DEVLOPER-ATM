const mongoose = require("mongoose");

connectDB().then(()=>{
    console.log("connected Transaction databse");
})
.catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect(MONGO_URL);
}


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