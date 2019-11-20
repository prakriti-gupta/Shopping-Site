var express=require("express");
var app=express();
var bodyParser=require('body-parser');
//const url=require("url");
var session=require('express-session');
app.use(express.json());
app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/login",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});
app.get("/manageProducts",function(req,res)
       {
    res.sendFile(__dirname+"/manageProducts.html");
});

app.listen(3000);