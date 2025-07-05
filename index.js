const express = require("express");
const app = express();
const bank = require("./module/atm");
const path = require("path");
const methodOverride = require('method-override');
const banktrans = require("./module/trans")
const connectDB = require("./module/db");
require('dotenv').config();


app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));

var id = 0;
var info = 0;

// hoem page 
app.get("/",(req,res)=>{
    res.render("home.ejs",{message : "WELOCOME TO DEVELOPER BANK ATM"});

})
// account page
app.get("/home/account",(req,res)=>{
    res.render("account.ejs");

})
// open account
app.post("/account",async(req,res)=>{
     let {name,createpassword,confirmpassword,amount}=req.body;
     if(createpassword == confirmpassword )
     {
        if(amount != typeof(String)){
            let user = await bank.find({password : confirmpassword})
        if(user.length == 0){
              bank.insertOne({
        name: name,
        password: confirmpassword,
        totalbalance: amount
     })
     info = 1;
        }
        
        }else{
            info=0;
        }
       
     }else{
        info = 0;
     }

    
    
     if(info == 1)
     {
        res.render("success.ejs",{
            message : "Account Created Successfully"
        })
     }else {
        res.render("inficient.ejs",{
            message : "Password Error"
        })
     }

})


// all features
app.get("/features",async(req,res)=>{
    let {password}=req.query;

    let data = await bank.find({password : password});
    console.log(data);
    id = password;
   
if(data.length != 0 ){
    res.render("feature.ejs")
}else{
   
   console.log("incorrect password");
   res.render("home.ejs",{message : "incorrect password"});
}

})



// deposit feature
app.get("/features/deposit",(req,res)=>{
    res.render("deposit.ejs", { message : null})

})

// deposit 
app.patch("/deposit",async(req,res)=>{
    let {deposit}=req.body;
            if(deposit > 100 && deposit%100==0){
                let user = await bank.find({password : id});
    let newbalance = user[0].totalbalance + Number(deposit);

     await banktrans.insertOne({
        user : user[0].name ,
        history : deposit,
        type : "Credit",
        date : new Date()
    })


    let data = await bank.updateOne({password : id},{
        totalbalance :  newbalance
    });
    console.log(data);
     res.render("success.ejs",{
        message: "Deposit Success"
     })
            }else{
                res.render("inficient.ejs",{
            message: "Deposit Error"
            })
        }
   
})

app.get("")

// bill feature
app.get("/features/bill",(req,res)=>{
    res.render("bill.ejs")

})




// transaction
app.get("/features/transaction",async(req,res)=>{
    let user = await bank.find({password : id});
    let trx = await banktrans.find({user : user[0].name});
    console.log("all trax",trx);
    res.render("transaction.ejs",{trx})

})



//withdraw feature
app.get("/features/withdraw",(req,res)=>{
    res.render("withdraw.ejs", { message : null})

})

// withdraw
app.patch("/withdraw",async(req,res)=>{
    let {withdraw}=req.body;
  let user = await bank.find({password : id});
    console.log(user);
    if(withdraw%100==0){
        if(user[0].totalbalance >= withdraw){
    let newbalance = user[0].totalbalance - Number(withdraw);


    await banktrans.insertOne({
        user : user[0].name ,
        history : withdraw,
        type : "Debit",
        date : new Date()
    })





    let data = await bank.updateOne({password : id},{
        totalbalance :  newbalance
    });
    info = 1;
}
    }else if(withdraw%100!=0){
        info = 0;
    }
    
    if(info == 1){
        res.render("success.ejs",{
            message: "Withdrawal Successfull"
        })
    }else{
        res.render("inficient.ejs",{
            message: "Withdraw Error"
        })
    }
})








//electric bill
app.get("/electricbill",(req,res)=>{
    res.render("billpay.ejs")
})
    
// pay  bill
app.patch("/bill/pay",async(req,res)=>{
     let {bill}=req.body;
     let user = await bank.find({password : id});
    console.log(user);
    if(user[0].totalbalance >= bill && bill != typeof(String)){


        await banktrans.insertOne({
         user : user[0].name ,
        history : bill,
         type : "Debit",
        date : new Date()
    })


    let newbalance = parseFloat(user[0].totalbalance) - parseFloat(bill);
    let data = await bank.updateOne({password : id},{
        totalbalance :  newbalance
    });
    info = 1;
}else{
    info = 0;
}


    if(info == 1){
        res.render("success.ejs",{
            message: "Bill Paid Successfully"
        })
    }else{
res.render("inficient.ejs",{
            message: "Bill Not Paid"
        })
    }
     
})


//water bill
app.get("/waterbill",(req,res)=>{
    res.render("billpay.ejs")
})
    


//gas bill
app.get("/gasbill",(req,res)=>{
    res.render("billpay.ejs")
})
    



//dth bill
app.get("/dthbill",(req,res)=>{
    res.render("billpay.ejs")
})
    



//internet bill
app.get("/internetbill",(req,res)=>{
    res.render("billpay.ejs")
})
    


//enquiry feature
app.get("/features/enquiry",async(req,res)=>{
     let user = await bank.find({password : id});
    res.render("enquiry.ejs",{user})
   

})

// transfer feature
app.get("/features/transfer",async(req,res)=>{
res.render("transfer.ejs")
})
// transfer
app.patch("/transfer/pay",async(req,res)=>{
   let {transfer}=req.body;
  let user = await bank.find({password : id});
    console.log(user);
    if(transfer%100==0 && user[0].totalbalance >= transfer){
        

        await banktrans.insertOne({
        user : user[0].name ,  
        history : transfer,
         type : "Debit",
        date : new Date()
    })
           
    let newbalance = user[0].totalbalance - Number(transfer);
    let data = await bank.updateOne({password : id},{
        totalbalance :  newbalance
    });
    info = 1;

    }else {
        info = 0;
    }
    
    if(info == 1){
        res.render("success.ejs",{
            message: "Amount Transfered Successfully"
        })
    }else{
        res.render("inficient.ejs",{
            message: "Amount Transfer Error"
        })
    }
})

const port = process.env.PORT || 8080 ;
app.listen(port,async()=>{
    await connectDB();
    console.log("litening port 8080");
})