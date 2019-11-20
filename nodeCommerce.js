var express=require("express");
var app=express();
var mongoose =require('mongoose');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');

mongoose.connect("mongodb://localhost/ecom",{ useNewUrlParser: true },{ useUnifiedTopology: true } );
//const url=require("url");
var session=require('express-session');
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());
//app.use(
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret:"kjhkk",
    resave:true,
    saveUninitialized: true
}))


//app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));



//connection with database


var Schema=mongoose.Schema;
var username;
let Product=new Schema({
    img:String,
    name:String,
    desc:String,
    price:Number,
    quan:Number,
});


let SignIn=new Schema({

    fname:String,
    lname:String,
    email:String,
    password:String,
    phoneNo:Number,
 
   
});
let Cart=new Schema({
    img:String,
    cid:Number,
    email:String,
    name:String,
    price:Number,
    oQty:Number,
    quan:Number,
   
 
   
});
var pro = mongoose.model('product',Product);
var signin=mongoose.model('signin',SignIn);
var cart=mongoose.model('cart',Cart);


app.post('/sign',(req,res) => {
 var len=JSON.parse(req.body.userList).length;
    var sData=new signin(); 
 sData.id=JSON.parse(req.body.userList)[len-1].id;    
 sData.fname=JSON.parse(req.body.userList)[len-1].fname;    
 sData.lname=JSON.parse(req.body.userList)[len-1].lname;
 sData.email=JSON.parse(req.body.userList)[len-1].email;
  sData.password=JSON.parse(req.body.userList)[len-1].password;
    sData.phoneNo=JSON.parse(req.body.userList)[len-1].phoneNo;

 sData.save(function(err)
{
if(err)
    {
        console.log("here Error");
    }
    res.redirect('/homePortal.html');
});        
});



app.get('/sign',(req,res)=>{
    console.log('running it');
    signin.find({},function(err,docs){
        if(err)
            {
                console.log("who error");
            }
       
        res.send(docs);
       
    });
});


app.get("/homePortal.html",function(req,res)
       {
    res.sendFile(__dirname+"/homePortal.html");
});




app.get('/homePortal/array',(req,res)=>{
    console.log('running it');
    pro.find({},function(err,docs){
        if(err)
            {
                console.log("hello error");
            }
       
        res.send(docs);
       
    });
});


app.post('/homePortal/update',(req,res)=>{

    var ob=(JSON.parse(req.body.obj));
 console.log(ob);
    var myquery = { name: ob.name };
  var newvalues = { $set: { name: ob.name, desc:ob.desc,price:ob.price,quan:ob.quan } };
   
    pro.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("here 1 document updated");

  });
});


app.post('/homePortal/Cartupdate',(req,res)=>{

    var ob=(JSON.parse(req.body.obj));
 
    var myquery = { cid: ob.cid };
  var newvalues = { $set: { cid: ob.cid,name: ob.name, email:ob.email,price:ob.price,quan:ob.quan,oQty:ob.oQty } };
   
    cart.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("yes 1 document updated");

  });
});


app.post('/homePortal/delete',(req,res)=>{
   
pro.findOneAndRemove({name:JSON.parse(req.body.name)}, function(err){
        if (err){
            throw err;
        }
       
        console.log('deleted');
    });
});

app.post('/homePortal/Cartdel',(req,res)=>{
    console.log(JSON.parse(req.body.cid));
    cart.findOneAndRemove({cid:JSON.parse(req.body.cid)}, function(err){
 
        if (err){
            throw err;
        }
        console.log('deleted');
    });
});



app.post('/homePortal/array',(req,res) => {
 var len=JSON.parse(req.body.productList).length;
    var sData=new pro();  
 sData.img=JSON.parse(req.body.productList)[len-1].img;    
 sData.name=JSON.parse(req.body.productList)[len-1].name;
 sData.desc=JSON.parse(req.body.productList)[len-1].desc;

  sData.quan=JSON.parse(req.body.productList)[len-1].quan;
    sData.price=JSON.parse(req.body.productList)[len-1].price;

 sData.save(function(err)
{
if(err)
    {
        console.log("here Error");
    }
    res.redirect('/homePortal.html');
});        
});



app.get('/homePortal/cart',(req,res)=>{
    console.log('running it');
    cart.find({},function(err,docs){
        if(err)
            {
                console.log("hello error");
            }
       
        res.send(docs);
       
    });
});



app.post('/homePortal/cart',(req,res) => {
 var len=JSON.parse(req.body.cartList).length;
    var sData=new cart();
sData.img=JSON.parse(req.body.cartList)[len-1].img;    
sData.cid=JSON.parse(req.body.cartList)[len-1].cid;
sData.email=JSON.parse(req.body.cartList)[len-1].email;
 sData.name=JSON.parse(req.body.cartList)[len-1].name;
 sData.oQty=JSON.parse(req.body.cartList)[len-1].oQty;
sData.price=JSON.parse(req.body.cartList)[len-1].price;
sData.quan=JSON.parse(req.body.cartList)[len-1].quan;
console.log( sData.email);
 sData.save(function(err)
{
if(err)
    {
        console.log("yes Error");
    }
    res.redirect('/homePortal.html');
});        
});



//app.post('/login',(req,res)=>
//        {
//    res.cookie("cookieUser",req.body.Email);
//    signin.find({},function(err,docs){
//        var f=0;
//       for(let i=0;i<docs.length;i++)
//           {
//        if(req.body.Password===docs[i].password && req.body.Email===docs[i].email)
//                   {
//                    username=docs[i].fname;
//    res.redirect('/view.html');
//   
//                       f=1;
//                   }
//             
//           }
//        if(req.body.Password==='chitkara' && req.body.Email==='chitkara@edu.in')
//                   {
//         res.redirect('/homePortal.html');
//
//                       f=1;
//                   }
//        if(f=0)
//            {
//                res.redirect('/login');
//            }
//});
//});



app.get("/homePage.html",function(req,res)
       {
    res.sendFile(__dirname+"/homePage.html");
});

app.get("/view.html",function(req,res)
       {
    res.sendFile(__dirname+"/view.html");
});


app.get("/login.html",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});


app.get("/signIn.html",function(req,res)
       {
    res.sendFile(__dirname+"/signIn.html");
});


app.get("/manageProducts.html",function(req,res)
       {
    res.sendFile(__dirname+"/manageProducts.html");
});


app.get("/checkOut.html",function(req,res)
       {
    res.sendFile(__dirname+"/checkOut.html");
});


app.get("/thanksForShopping.html",function(req,res)
       {
    res.sendFile(__dirname+"/thanksForShopping.html");
});



app.listen(3000);