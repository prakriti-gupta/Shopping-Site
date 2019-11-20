var express =require('express');
var app=express();
var bodyParser=require('body-parser');

var session=require('express-session');
var mongoose =require('mongoose');
var Schema=mongoose.Schema;

app.use(express.json());
app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/chitkara",{ useNewUrlParser: true },{ useUnifiedTopology: true } );//connection with database

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let Student=new Schema({name:String,stream:String,age:Number})

var student=mongoose.model("student",Student);
