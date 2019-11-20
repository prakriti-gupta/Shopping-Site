var users=[];
var userId=1;
getStoredUsers();
function getStoredUsers(){
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    users = JSON.parse(xhttp.responseText);
     
    userId = products.length+1;

    }
}
 xhttp.open("GET", "/sign", true);
    xhttp.send();  
}

function signin()
{
   
    
var fname=document.getElementById('firstName').value;
var email=document.getElementById('email').value;
var lname=document.getElementById('lastName').value;
var psw=document.getElementById('createPassword').value;
var cpsw=document.getElementById('confirmPassword').value;
var phoneNo=document.getElementById('phoneNo').value;

   var objuser = new Object();
objuser.id=userId;
objuser.fname=fname;  
objuser.lname=lname;   
objuser.email=email;  
objuser.password=psw;
objuser.cpassword=cpsw;    
objuser.phoneNo=phoneNo; 
    
addregisterToArray(objuser);
}
function addregisterToArray(objuser)
{
 
    
    
    var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
console.log(objuser.email)
    var k=0;
    for(var i=0;i<users.length;i++)
        {
            if(users[i].email.match(objuser.email) && objuser.email!='')
                {

                    k=1;
                    break;
                }
        }

    if(objuser.password!=objuser.cpassword)
        {
            alert("password and confirm password are not same");
        }
    
    else if(objuser.fname==""||objuser.lname==""||objuser.email==""||objuser.password==""||objuser.cpassword==""||objuser.phn=="")
        {
            alert('fields can not be be empty');
        }
    else if(k==1)
            {
            alert("Email Address already exist");
            }
    
     
    else if(objuser.password.length<6)
        {
            alert("password should be of length more than 6");
        }
else
{
users.push(objuser);
storeUsers();
alert("You have successfully registered..Have a blasting shopping experience with us :)");
    window.location.href="login.html";
}
}


function storeUsers(){
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/sign", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("userList="+JSON.stringify(users));
}
