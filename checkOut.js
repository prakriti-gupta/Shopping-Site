var cart=[];
var cartId;
var products=[];
var productId;



var divListProduct=document.getElementById("divListProduct");
var total=document.getElementById("total");
var tsum=0;

var decode=decodeURIComponent(document.cookie);
var cook=decode.split(";");
var ucname="";
ucname=cook[1];
var ucnm=cook[1].split('@');

getStoredProducts();


var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Hi, "+ucnm[0];



function deleteDOM()
{
   var childNodes = divListProduct.childNodes;
 
    childNodes.length=0;
   for (var i = 0; childNodes.length > 0;)
   {
     divListProduct.removeChild(childNodes[i]);
   }  
}




function deleteProductDiv(e)
{
    var targetParent = event.target.parentNode;
    var selectedProductIndex = getProductIndex(targetParent.id); deleteFromDataBase(cart[selectedProductIndex].cid);
    removeFromCartArray(selectedProductIndex);
 targetParent.parentNode.removeChild(targetParent);
    
    getStoredCart();
}





function removeFromCartArray(selectedProductIndex)
        {
         cart.splice(selectedProductIndex,1);
        }





function deleteFromDataBase(cid){
    console.log(JSON.stringify(cid));
    var xhttp = new XMLHttpRequest();
    this.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/Cartdel", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   
  xhttp.send("cid="+JSON.stringify(cid));
}




function getStoredCart(){
   deleteDOM();
    var cartCheck=false;
    tsum=0;
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
    //console.log(cart.length);
    cart = JSON.parse(xhttp.responseText);
   
    cartId = cart.length-2;
       
 for(var i=0;i<cart.length;i++)
  {
    
     for(var j=0;j<products.length;j++)
         {

    if(cart[i].email==ucname && cart[i].name==products[j].name)
    {
        tsum=tsum+(cart[i].quan*cart[i].price);
        cartCheck=true;
        addcartToDOM(cart[i]);
    }
         }
      //if(cartCheck)
          //{
           total.innerHTML="Total is "+tsum;
          //}
     
  }
   total.innerHTML="Total is "+tsum;     
    }
       
}
 xhttp.open("GET", "/homePortal/cart", true);
    xhttp.send();  
}




function alterTable()
{
    deleteDOM();
    var g=0;
   document.location.reload(true);
    for(var i=0;i<cart.length;i++)
        {
            if(cart[i].email==ucname)
                {
                       
            for(var j=0;j<products.length;j++)
                {
                   
     if(String(cart[i].name)==(String(products[j].name)))
                      {
                 
         products[j].quan=products[j].quan-cart[i].quan;
            if(products[j].quan>=0)
            {  
                         
            updateFromDatabase(products[j]);
            }
            else
                {
                     g=1;
                    alert(products[j].name+" Product is Out of Stock Now!");
                    break;
                
                }
                      }
                }
                }
        }
    for(var i=0;i<cart.length;i++)
        {
            if(cart[i].email==ucname)
                {
 deleteFromDataBase(cart[i].cid);
                }
        }
    if(tsum>0 && g!=1)
        {
    window.location.href="thanksForShopping.html";
        }
    else if(g==1)
        {
        window.location.href="view.html";            
        }
    else
        {
    alert('Have some shopping First');
        }
}
   





    function updateFromDatabase(objProduct1)
   {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(objProduct1));
}
   



function getStoredProducts(){

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    products = JSON.parse(xhttp.responseText);
   
    productId = products[products.length-1].id+1;
 
    }
}
 xhttp.open("GET", "/homePortal/array", true);
    xhttp.send();  
}




function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
var br = document.createElement("br");
    target.appendChild(br);
}
}





function addcartToDOM(objProduct)
{    
var divProduct = document.createElement("div");
divProduct.setAttribute("id", objProduct.cid);

var lblProductImg = document.createElement("img");
    var im=String(objProduct.img);
    var im1=im.split("\\");
 var path=im1[2];
lblProductImg.src=path;
lblProductImg.setAttribute("width","40%");
lblProductImg.style.textAlign="center";    
divProduct.appendChild(lblProductImg);
    
   
    insertBlankLine(divProduct,2);
   
var lblProductName = document.createElement("label");
lblProductName.innerHTML =objProduct.name;
    lblProductName.style.fontWeight="500";
    lblProductName.style.textAlign="left";
    lblProductName.style.marginLeft="5%";
divProduct.appendChild(lblProductName);

     insertBlankLine(divProduct,1);


var lblProductPrice = document.createElement("label");
lblProductPrice.innerHTML = "Price: "+objProduct.price;
divProduct.appendChild(lblProductPrice);

    insertBlankLine(divProduct,1);

var lblProductQuan = document.createElement("label");
lblProductQuan.innerHTML = "Quantity: "+objProduct.quan;
divProduct.appendChild(lblProductQuan);
   
var buttonDelete = document.createElement("button");
buttonDelete.innerHTML = "Delete";
buttonDelete.setAttribute("style","margin-left:20px");
divProduct.appendChild(buttonDelete);
   
   
    divProduct.style.border="1px solid";      //adding to border
    divProduct.style.padding="10px";
    divProduct.style.boxShadow="1px 2px 20px #888888";
    divProduct.style.width="25%";
    divProduct.style.marginTop="3%";
    divProduct.style.marginLeft="5%";
    divProduct.style.textAlign="center";
    divProduct.style.display="inline-table";
   
   
divListProduct.appendChild(divProduct);
    divListProduct.appendChild(divProduct);
    divListProduct.style.marginLeft="1%";
    divListProduct.style.textAlign="center";
   
buttonDelete.addEventListener("click",function(event)
{
deleteProductDiv(event);
});
}




function getProductIndex(id)
{
    for (var i = 0; i < cart.length; i++)
{
        if (cart[i].cid == id)
return i;
    }
}



total.innerHTML="Total is "+tsum;
