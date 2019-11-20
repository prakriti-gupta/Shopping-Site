var users=[];
var userId=1;
var pos=0;
getusers();
function getusers()
{
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




function login()
{
    getusers();
    var check=0;
    var email=document.getElementById("Email").value; 
    var psw=document.getElementById("Password").value;
    if(email.match("chitkara@edu.in") && psw.match("chitkara")){
         document.cookie="Admin";
        window.location.href="homePortal.html";
    }
    else
        {
            var f=0;
            console.log(users.length);
    for(var i=0;i<users.length;i++)
        {
           if(users[i].password.match(psw)&&users[i].email.match(email))
                {
                   
                 f=1;
                    pos=i;
                    check=1;
                    break;
                }
        }
        
    if(f==1)
        
     {
        
         document.cookie=users[pos].email;

       location.href="view.html";
     }
    else{
        alert("Invalid Credentials");
    }
        }
  
}