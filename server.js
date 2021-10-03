const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/users")
const Chromo = require("./models/chromo")
const Genes = require("./models/genes")
const Luke = require("./models/luke")
const Records = require("./models/records")
const upload = require("./handlers/multer.js");
const cookie = require('cookie-parser');
const bycrypt = require('bcryptjs');
const verify = require("./middleware/verify")
const app = express();

mongoose.connect("mongodb+srv://anushka:aXAeVjFI2MhnT9Da@cluster0.5ckct.mongodb.net/Bio?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true, useFindAndModify : false})
app.set('view engine', 'ejs')
app.use(cookie());
app.use(express.urlencoded({limit:'5mb',extended: false}));
app.use(express.static("public"));


app.use("/login", require("./routes/login"));

app.get("/dashboard",verify,async(req,res)=>{
  if(req.auth != "valid"){
    res.redirect("/login")
    return;
  }
  const user = await User.findOne({username : req.data.username});

  console.log(user);
  const record = await Records.find({userID : req.data.username})
  console.log(record);
  res.render("dashboard" , {user : user , record : record})
})

app.post("/dashboard", verify ,async(req,res)=>{
  try{

  const records = new Records({
    a : req.body.a,
    b : req.body.b,
    c : req.body.c,
    userID : req.data.username
  })

  await records.save();
  res.redirect("/dashboard")
}
catch(e){
  res.send(e.message)
}
})





app.get("/",(req,res)=>{
  res.render("home");
})
app.get("/drugs",(req,res)=>{
  res.render("drugs");
})

app.get("/register",(req,res)=>{
  res.render("register")
})


app.post("/register",async(req,res)=>{
  try{

  const username = req.body.username;
  let password = req.body.password;
  const salt = await bycrypt.genSalt(10);
  password = await bycrypt.hash(password,salt);

  const user = new User({
    username : username,
    password : password,
    name : req.body.name,
    age : req.body.age,
    email : req.body.email
  })

  await user.save();
  res.redirect("/")
}
catch(e){
  res.send(e.message);
}
})

app.get("/genes",async(req,res)=>{
  try{

    let genes = await Genes.find();
    let chromo = await Chromo.find();
    let luke = await Luke.find()
    res.render("genes" ,{ genes : genes , chromo : chromo, luke : luke})

  }
  catch(e){
    res.send(e.message)
  }
})


app.get("/register1",(req,res)=>{
  res.render("reg1");
})

app.post("/register1",async(req,res)=>{
  try{

  let gene = new Genes({
    cnumber : req.body.chromo,
    gname : req.body.gene,
    gloci : req.body.loci
  })

  await gene.save();
  res.redirect("/register1")
}
catch(e){
  res.send(e.message)
}
})
app.get("/register2",async(req,res)=>{
res.render("reg2");
})
app.post("/register2",async(req,res)=>{
  try{

  let gene = new Chromo({
    cnumber : req.body.chromo,
    gname : req.body.gene,
    gloci : req.body.loci
  })

  await gene.save();
  res.redirect("/register2")
}
catch(e){
  res.send(e.message)
}
})
app.get("/register3",async(req,res)=>{
res.render("reg3");
})
app.post("/register3",async(req,res)=>{
  try{

  let gene = new Luke({
    type : req.body.chromo,
    geneName : req.body.gene,
  })

  await gene.save();
  res.redirect("/register3")
}
catch(e){
  res.send(e.message)
}
})

// // new thing i added
// app.post("/register3",async(req,res)=>{})




app.get("/logout",(req,res)=>{
  res.clearCookie("token");
  res.redirect("/")
})
app.listen(3000,()=>{
  console.log("Server up on 3000");
})
