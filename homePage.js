var users=[];
var userId=1;
var fields=document.getElementById("fields");
var log=document.getElementById("login");
var reg=document.getElementById("register");
getusers();
 var check=0;

function getusers()
{
if(!localStorage.users)
{
localStorage.users = JSON.stringify([]);
}
else
{
users = JSON.parse(localStorage.users);
userId = users[users.length-1].id+1;
}
}

function hide_login()
{
   log.setAttribute("style","visibility:hidden");
    
}

function hide_register()
{
   reg.setAttribute("style","visibility:hidden");
    
}


function register()
{
    
    create_register();
     hide_register();
}

function login()
{

    create_login();
     hide_login();
}

function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
var br = document.createElement("br");
    target.appendChild(br);
}
}

function create_login()
{
   
insertBlankLine(fields,3);
    
    var lbl=document.createElement("label");
lbl.innerHTML = "Login";
lbl.setAttribute("style","font-weight:bold");
fields.appendChild(lbl);    

insertBlankLine(fields,2);

var Username = document.createElement("input");
Username.setAttribute("type","email");
Username.setAttribute("id","txt1Email");
  Username.setAttribute("placeholder", "Enter your Email Address");	
Username.setAttribute("style","width:250px");
fields.appendChild(Username);	
    
    
    insertBlankLine(fields,2);
    
    var Password = document.createElement("input");
Password.setAttribute("type","password");
Password.setAttribute("id","txt1Password");
Password.setAttribute("placeholder", "Enter password");	
Password.setAttribute("style","width:250px");
fields.appendChild(Password);

 
    insertBlankLine(fields,3);
   var btnLogin = document.createElement("button");
btnLogin.setAttribute("id","btnLogin");
btnLogin.setAttribute("style","margin-left:30px");
btnLogin.innerHTML = "Login";
fields.appendChild(btnLogin);	

    btnLogin.addEventListener("click", function(event)
{
addLogin(Username,Password);
}
);    
}

function addLogin(Username,Password)
{
    var f=0;
    var pos=0;
    
    var user=document.getElementById("txt1Email").value; 
     var cp=document.getElementById("txt1Password").value;
    
    if(user==""||cp=="")
        alert("fields need to be filled!!");
    else
    if(user.match("chitkara@edu.in") && cp.match("chitkara"))
        {
            check=1;
            window.location.href="/manageProducts.html";
            
        }
    else
        {
    for(var i=0;i<users.length;i++)
        {
            if(users[i].Password.match(cp)&&users[i].Email.match(user))
                {
                 f=1;
                    pos=i;
                    check=1;
                 //   alert(pos);
                    break;
                }
           
        }
    if(f==1)
        
     { 
       users[pos].flag=check; 
         sessionStorage.userPosition = JSON.stringify(users[pos].Username);
         localStorage.users = JSON.stringify(users);
          sessionStorage.uId = JSON.stringify(users[pos].id);
        window.location.href="view.html";
     }
    else{
        alert("Invalid Credentials");
    }
        }
}

function create_register()
{
    
    insertBlankLine(fields,3);
    
    var lbl=document.createElement("label");
lbl.innerHTML = "Register Yourself";
lbl.setAttribute("style","font-weight:bold");
fields.appendChild(lbl);    

insertBlankLine(fields,2);

var Username = document.createElement("input");
Username.setAttribute("type","text");
Username.setAttribute("id","txtUsername");
  Username.setAttribute("placeholder", "Enter username");	
Username.setAttribute("style","width:250px");
fields.appendChild(Username);	
    
    
     
    insertBlankLine(fields,2);
    
    var Email = document.createElement("input");
Email.setAttribute("type","email");
Email.setAttribute("id","txtEmail");
Email.setAttribute("placeholder", "Enter your Email Address");	
Email.setAttribute("style","width:250px");
fields.appendChild(Email);  
    
    
    
    insertBlankLine(fields,2);
    
    var Password = document.createElement("input");
Password.setAttribute("type","password");
Password.setAttribute("id","txtPassword");
Password.setAttribute("placeholder", "Enter password");	
Password.setAttribute("style","width:250px");
fields.appendChild(Password);
    
 insertBlankLine(fields,2);
    
    var cPassword = document.createElement("input");
cPassword.setAttribute("type","password");
cPassword.setAttribute("id","txtcPassword");
cPassword.setAttribute("placeholder", "Confirm Your Password");	
cPassword.setAttribute("style","width:250px");
fields.appendChild(cPassword);  
 
    insertBlankLine(fields,3);
   var btnRegister = document.createElement("button");
btnRegister.setAttribute("id","btnRegister");
btnRegister.setAttribute("style","margin-left:30px");
btnRegister.innerHTML = "Register";
fields.appendChild(btnRegister);	

    btnRegister.addEventListener("click", function(event)
{
addregisterToArray();
}
);    
}



function addregisterToArray()
{
    
    var cpassword=document.getElementById("txtcPassword").value;
    var objuser = new Object();
objuser.id=userId;
   
    objuser.flag=0;
    var pl=document.getElementById("txtPassword").value;
objuser.Username=document.getElementById("txtUsername").value;
objuser.Email=document.getElementById("txtEmail").value;
objuser.Password=document.getElementById("txtPassword").value;
    var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

    var k=0;
    for(var i=0;i<users.length;i++)
        {
            if(users[i].Email.match(objuser.Email))
                {
                    k=1;
                    break;
                }
        }
if(objuser.Username=="" ||objuser.Email=="" || objuser.Password==""|| cpassword=="" )
{
alert("all fields are compulsory");

}
    
    else if(k==1)
            {
            alert("Email already exist");
            }
    else if(objuser.Password!=cpassword)
        {
            alert("password and confirm password are not same");
        }
    else if(!(objuser.Email).match(emailExp))
        {
            alert("Not a valid email address");
        }
    else if(pl.length<6)
        {
            alert("password should be of length more than 6");
        }
else
{
users.push(objuser);
storeUsers();
userId++;
alert("You have successfully registered..Have a blasting shopping experience with us :)");
}
}

function storeUsers()
{
    localStorage.users = JSON.stringify(users);
}