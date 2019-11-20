
var cart=[];
var carts=[];
var products=[];
var productId=1;
var userPosition;
var cartId=1;

var f=1;
var users=[];
var userId=1;
var pos=0;
var qty;



var decode=decodeURIComponent(document.cookie);
var cook=decode.split(";");
var ucname="";
ucname=cook[1];
console.log(ucname);
var ucnm=cook[1].split('@');
getStoredCart();
var giveId="";



var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Hi, "+ucnm[0];

var divListProducts=document.getElementById("divListProducts");

getStoredProducts();

function logoutUser()
{
    window.location.href="homePage.html";
   document.cookie='kkk';
}


function deleteDOM()
{
   var childNodes =divListProducts.childNodes;
 
    childNodes.length=0;
   for (var i = 0; childNodes.length > 0;)
   {
     
     divListProducts.removeChild(childNodes[i]);
   }  
}



function getStoredProducts(){
  deleteDOM();
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    products = JSON.parse(xhttp.responseText);
 
    productId = products[products.length-1].id+1;
for(var i=0;i<products.length;i++)
{
       
addProductToDOM(products[i]);
}
       
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



function addProductToDOM(objProduct)
{  
   
    var divProduct = document.createElement("div");
    divProduct.setAttribute("id", objProduct.name);
   
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


    var lblProductDesc = document.createElement("label");
    lblProductDesc.innerHTML =objProduct.desc;
    lblProductDesc.style.fontStyle="italics";
   
    divProduct.appendChild(lblProductDesc);

    insertBlankLine(divProduct,1);

var lblProductPrice = document.createElement("label");
lblProductPrice.innerHTML ="Price : "+ objProduct.price;
divProduct.appendChild(lblProductPrice);


    insertBlankLine(divProduct,2);
var id=objProduct.id;
var txtProductQty = document.createElement("input");
txtProductQty.setAttribute("type","number");
  giveId="cartQty"+objProduct.name;

txtProductQty.setAttribute("id",giveId);

txtProductQty.setAttribute("placeholder", "Enter the required quantity");
txtProductQty.setAttribute("style","width:250px");
divProduct.appendChild(txtProductQty);
   

var buttonAddCart = document.createElement("button");
buttonAddCart.innerHTML = "Add to Cart";
divProduct.appendChild(buttonAddCart);

   
    divProduct.style.border="1px solid";      //adding to border
    divProduct.style.padding="10px";
    divProduct.style.boxShadow="1px 2px 20px #888888";
    divProduct.style.width="25%";
    divProduct.style.marginTop="3%";
    divProduct.style.marginLeft="5%";
    divProduct.style.textAlign="center";
    divProduct.style.display="inline-table";
   
   
   
    divListProducts.appendChild(divProduct);
    divListProducts.style.marginLeft="1%";
    divListProducts.style.textAlign="center";
buttonAddCart.addEventListener("click",function(event)
{
AddToCart(event);
});
insertBlankLine(divProduct,3);
}


function checkForIndex(id)
{
    for(var i=0;i<products.length;i++)
        {
        if(id==products[i].name)
            {
            return i;
            }
        }
}


function AddToCart(event)
{
    getStoredCart();
var targetParent =event.target.parentNode;
var id = targetParent.id;
    var index=checkForIndex(id);
   
    var price=products[index].price;
    var originalQty=products[index].quan;
    var name=products[index].name;
    var img=products[index].img;
 qty=document.getElementById("cartQty"+name).value;
   
    qty=parseInt(qty);

    var flag=1;
   
    originalQty=parseInt(originalQty);
 
    if(qty>=1 && qty<=originalQty )
        {
       
    for(var i=0;i<carts.length;i++)
         {
             
     if(carts[i].email==ucname&&carts[i].name==name)
             {
                 
                 
                 flag=0;
    updateProducttoList(carts[i]);
                 break;
                    }
                }
     if(flag==1)
       {

addToCartArray(originalQty,qty,price,name,img);
       }
   
          alert("Item is successfully added to the cart");  
        }
else if(qty<0)
  {
   alert("quantity cannot be in negative value");
  }
    else if(qty==0)
  {
   alert("quantity cannot be Zero");
  }
    else
        {
        alert("Out of Stock...");
        }
 }



function updateProducttoList(objProduct1)
{  
var q=objProduct1.quan;
objProduct1.quan=document.getElementById("cartQty"+objProduct1.name).value;
 objProduct1.quan=(Number(objProduct1.quan))+(Number(q));
//alert(objProduct1.email);
    console.log(objProduct1.email);
updateCartFromDatabase(objProduct1);
}





function updateCartFromDatabase(objProduct1)
{
   
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST","/homePortal/Cartupdate", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(objProduct1));
}






function storeCart()
{
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/homePortal/cart", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("cartList="+JSON.stringify(cart));
}





function getStoredCart(){

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
     
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    carts = JSON.parse(xhttp.responseText);
   
    cartId = carts.length+1;

    }
       
}
 xhttp.open("GET", "/homePortal/cart", true);
    xhttp.send();  
}





function addToCartArray(originalQty,qty,price,name,img)
{
   
    var objProduct = new Object();
    objProduct.cid=cartId;
    objProduct.img=img;
    objProduct.email=ucname;
  
    objProduct.name=name;
    objProduct.oQty=originalQty;
    objProduct.price=price;
    objProduct.quan=qty;
    cart.push(objProduct);
  
    
    cartId++;
    storeCart();  

}