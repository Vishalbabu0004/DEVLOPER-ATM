const mongoose = require("mongoose");

// connectDB().then(()=>{
//     console.log("connected Transaction databse");
// })
// .catch(err => console.log(err));

// async function connectDB() {
//   await mongoose.connect(process.env.MONGO_URL);
// }


const transConnection = mongoose.createConnection(process.env.TRANS_DB, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
})


const transSchema = new mongoose.Schema({
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
const banktrans = transConnection.model('banktrans', transSchema);

module.exports = banktrans;