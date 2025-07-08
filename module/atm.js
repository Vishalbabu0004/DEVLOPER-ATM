require("dotenv").config();
const mongoose = require("mongoose");

const atmschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : Number,
        required:true,
        unique : true
    },
    totalbalance : {
        type: Number,
        required:true
    },
});

// ✅ Properly create and export model using a named connection
const atmConnection = mongoose.createConnection(process.env.ATM_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

atmConnection.on("connected", () => {
    console.log("✅ connected mongodb ATM database");
});

const bank = atmConnection.model('bank', atmschema);

module.exports = bank;