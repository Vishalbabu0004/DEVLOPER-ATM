require("dotenv").config();
const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
    user : {
        type : String,
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

// ✅ Properly create and export model using a named connection
const transConnection = mongoose.createConnection(process.env.TRANS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

transConnection.on("connected", () => {
    console.log("✅ connected mongodb TRANS database");
});

const banktrans = transConnection.model('banktrans', transSchema);

module.exports = banktrans;