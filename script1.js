var products=[];
var prid=1;
var check=true;
var productId=0;
var aAddProduct=document.getElementById("aAddProduct");
var divAddProducts=document.getElementById("divAddProducts");
var divListProducts=document.getElementById("divListProducts");
var aAddToCart=document.getElementById("aAddToCart");



var display=document.getElementById("display");
display.setAttribute("style","font-weight:bold");
display.innerHTML="Admin";


aAddProduct.addEventListener("click",function(event)
{
   if(check)
createProductPanel();
divAddProducts.setAttribute("style","visibility:visible");
    check=false;
   
});


function logoutUser()
{
    window.location.href="homePage.html";
   document.cookie='kkk';
}


function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
var br = document.createElement("br");
    target.appendChild(br);
}}


function openNav() {
       // alterTable();
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}


function deleteProductDiv(e)
{
    var targetParent = event.target.parentNode;
    //console.log(targetParent);
    var selectedProductIndex = getProductIndex(targetParent.id);
    deleteFromDataBase(products[selectedProductIndex].name);
    removeFromProductsArray(selectedProductIndex);
    targetParent.parentNode.removeChild(targetParent);
}


function editProductDiv(event)
{
deleteNewProductPanel2();
    console.log("in editProductDiv",products);
var objProduct = new Object();
var targetParent = event.target.parentNode;
var name = targetParent.id;

for(var i=0;i<products.length;i++)
{
if (products[i].name == name)
{
   createProductPanel2(products[i]);
    break;
}
}
}


function getProductIndex(id)
{
    for (var i = 0; i < products.length; i++)
{
        if (products[i].name == id)
return i;
    }
}


function removeFromProductsArray(selectedProductIndex)
{
products.splice(selectedProductIndex,1);
//console.log(products);
}







function updateProducttoList(objProduct1)
{
   
objProduct1.name=document.getElementById("txtProductName").value;
objProduct1.desc=document.getElementById("txtProductDesc").value;
objProduct1.price=document.getElementById("txtProductPrice").value;
objProduct1.quan=document.getElementById("txtProductQuan").value;
var inif=false;
   
for(var i=0;i<products.length;i++)
{
if(objProduct1.name==products[i].name)
{
products[i]=objProduct1;
    inif=true;
break;
}
}
    if(inif)
   {
        updateFromDatabase(objProduct1);
         getStoredProducts();
deleteNewProductPanel2();
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

function hideAddNewnk()
{
    aAddProduct.setAttribute("style","visibility:hidden");
}

function unhideAddNewProductLink()
{
   
aAddProduct.setAttribute("style","visibility:visible");
}




function deleteNewProductPanel()
{
   var childNodes = divAddProducts.childNodes;
   
   for (var i = 0; childNodes.length >0;)
   {
       
     divAddProducts.removeChild(childNodes[i]);
   }
   

}

function deleteDOM()
{
   var childNodes = divListProducts.childNodes;
 
    childNodes.length=0;
   for (var i = 0; childNodes.length > 0;)
   {
     
     divListProducts.removeChild(childNodes[i]);
   }  
}

function deleteNewProductPanel2()
{
   var childNodes = divAddProducts.childNodes;
   for (var i = 0; childNodes.length > 0;)
   {
     divAddProducts.removeChild(childNodes[i]);
   }
}





function addProducttoList()
{
var objProduct = new Object();
objProduct.id=productId;
objProduct.img=document.getElementById("txtProductImg").value;  
objProduct.name=document.getElementById("txtProductName").value;
objProduct.desc=document.getElementById("txtProductDesc").value;
objProduct.price=document.getElementById("txtProductPrice").value;
objProduct.quan=document.getElementById("txtProductQuan").value;
if(objProduct.name=="" || objProduct.desc=="" || objProduct.price==""|| objProduct.quan=="" )
{
alert("all fields are compulsory");
}
else
{
products.push(objProduct);
addProductToDOM(objProduct);
storeProducts();
deleteNewProductPanel();
productId++;
}
}




function deleteFromDataBase(name){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name="+JSON.stringify(name));
}




function storeProducts(){
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/homePortal/array", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("productList="+JSON.stringify(products));
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
lblProductName.setAttribute('style','font-weight:bold;margin:15px');
 
divProduct.appendChild(lblProductName);
insertBlankLine(divProduct,2);


var lblProductDesc = document.createElement("label");
lblProductDesc.innerHTML =objProduct.desc;
lblProductDesc.setAttribute('style','font-style:Italics');
   
    divProduct.appendChild(lblProductDesc);
       

    insertBlankLine(divProduct,2);

var lblProductPrice = document.createElement("label");
lblProductPrice.innerHTML = "Price :- "+objProduct.price;
lblProductPrice.setAttribute('style','font-weight:bold');
 
divProduct.appendChild(lblProductPrice);
   

    insertBlankLine(divProduct,2);

var lblProductQuan = document.createElement("label");
lblProductQuan.innerHTML = "Quantity :- " +objProduct.quan;
lblProductQuan.setAttribute('style','font-weight:bold');
   
divProduct.appendChild(lblProductQuan);

    insertBlankLine(divProduct,2);
   
   
var buttonEdit = document.createElement("button");
buttonEdit.innerHTML = "edit";
buttonEdit.setAttribute('style','border-radius:12px;')
divProduct.setAttribute('style','border:1px solid black;');
divProduct.appendChild(buttonEdit);
//divListProducts.appendChild(divProduct);
buttonEdit.addEventListener("click",function(event)
{
    openNav();
editProductDiv(event);

});

var buttonDelete = document.createElement("button");
buttonDelete.innerHTML = "Delete";
buttonDelete.setAttribute("style","margin-left:20px;border-radius:12px");
divProduct.appendChild(buttonDelete);
   
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
   
   
   
buttonDelete.addEventListener("click",function(event)
{
    deleteProductDiv(event);
});

    insertBlankLine(divProduct,2);


}








function createProductPanel()
{
//hideAddNewnk();

var fildset=document.createElement('fieldset');
fildset.setAttribute('style','font-size:24px;color:white;width:50%;text-align:center;margin-left:22%;');
var div=document.createElement('div');
var lblAddProduct=document.createElement("label");
lblAddProduct.innerHTML = "Add New Product";
lblAddProduct.setAttribute("style","font-weight:bold;text-align:center;");
div.setAttribute('style','color:white;');
div.appendChild(lblAddProduct);
divAddProducts.appendChild(div);
divAddProducts.appendChild(fildset);
insertBlankLine(divAddProducts,2);

var txtProductName = document.createElement("input");
var label4=document.createElement('label');
label4.innerHTML="Product Name :-";
label4.setAttribute('style','font-weight:bold');
txtProductName.setAttribute("type","text");
txtProductName.setAttribute("id","txtProductName");
txtProductName.setAttribute("placeholder", "Enter the product name");
txtProductName.setAttribute("style","");
fildset.appendChild(label4);
fildset.appendChild(txtProductName);

insertBlankLine(fildset,2);

var txtProductDesc = document.createElement("input");
var label3=document.createElement('label');
label3.innerHTML="Product Description :-";
label3.setAttribute('style','font-weight:bold');
txtProductDesc.setAttribute("type","text");
txtProductDesc.setAttribute("id","txtProductDesc");
txtProductDesc.setAttribute("placeholder", "Enter the product description");
txtProductDesc.setAttribute("style","width:250px; height:50px");
fildset.appendChild(label3);
fildset.appendChild(txtProductDesc);

insertBlankLine(fildset,2);

var txtProductPrice = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="Product Price :-";
label2.setAttribute('style','font-weight:bold');
txtProductPrice.setAttribute("type","number");
txtProductPrice.setAttribute("id","txtProductPrice");
txtProductPrice.setAttribute("placeholder", "Enter the product price");
txtProductPrice.setAttribute("style","width:250px;margin-left:44px");
fildset.appendChild(label2);
fildset.appendChild(txtProductPrice);

insertBlankLine(fildset,2);

var txtProductQuan = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Product Quantity :-";
label1.setAttribute('style','font-weight:bold');
txtProductQuan.setAttribute("type","number");
txtProductQuan.setAttribute("id","txtProductQuan");
txtProductQuan.setAttribute("placeholder", "Enter the product Quantity");
txtProductQuan.setAttribute("style","width:250px;margin-left:20px");
fildset.appendChild(label1);
fildset.appendChild(txtProductQuan);

insertBlankLine(fildset,2);
   
var txtProductImg = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Product Image :-";
label1.setAttribute('style','font-weight:bold');
txtProductImg.setAttribute("type","file");
txtProductImg.setAttribute("id","txtProductImg");
txtProductImg.setAttribute("accept","image/*");
   
fildset.appendChild(label1);
fildset.appendChild(txtProductImg);

insertBlankLine(fildset,2);    
   

var btnAddButton = document.createElement("button");
btnAddButton.setAttribute("id","btnAddButton");
btnAddButton.innerHTML = "Add Product";
btnAddButton.setAttribute('style','border-radius:12px');
fildset.appendChild(btnAddButton);

    btnAddButton.addEventListener("click", function(event)
{
addProducttoList();
        check=true;
        closeNav();
}
);

    var btnCancelButton = document.createElement("button");
btnCancelButton.setAttribute("id","btnCancelButton");
btnCancelButton.setAttribute("style","margin-left:30px");
btnCancelButton.innerHTML = "Cancel";
btnCancelButton.setAttribute('style','border-radius:12px;margin-left:25px');
fildset.appendChild(btnCancelButton);
divAddProducts.appendChild(fildset);

    btnCancelButton.addEventListener("click", function(event)
{
        check=true;
deleteNewProductPanel();
createProductPanel();
        closeNav();
}
);

}







function createProductPanel2(objProduct)
{
   var fildset=document.createElement('fieldset');
fildset.setAttribute('style','font-size:24px;color:white;width:50%;text-align:center;margin-left:22%;');
var div=document.createElement('div');
var lblAddProduct=document.createElement("label");
lblAddProduct.innerHTML = "Update Product";
lblAddProduct.setAttribute("style","font-weight:bold;text-align:center;");
div.setAttribute('style','color:white;');
div.appendChild(lblAddProduct);
divAddProducts.appendChild(div);
insertBlankLine(fildset,2);

var txtProductName = document.createElement("input");
var label4=document.createElement('label');
label4.innerHTML="Product Name :-";
label4.setAttribute('style','font-weight:bold');
txtProductName.setAttribute("type","text");
txtProductName.setAttribute("id","txtProductName");
 txtProductName.setAttribute("value",objProduct.name);
txtProductName.setAttribute("style","width:250px;margin-left:38px");
fildset.appendChild(label4);
fildset.appendChild(txtProductName);

insertBlankLine(fildset,2);
   
var txtProductDesc = document.createElement("input");
var label3=document.createElement('label');
label3.innerHTML="Product Description :-";
label3.setAttribute('style','font-weight:bold');
txtProductDesc.setAttribute("type","text");
txtProductDesc.setAttribute("id","txtProductDesc");
txtProductDesc.setAttribute("value",objProduct.desc);
txtProductDesc.setAttribute("style","width:250px; height:50px;");
fildset.appendChild(label3);
fildset.appendChild(txtProductDesc);

insertBlankLine(fildset,2);

var txtProductPrice = document.createElement("input");
var label2=document.createElement('label');
label2.innerHTML="Product Price:-";
label2.setAttribute('style','font-weight:bold');
txtProductPrice.setAttribute("type","text");
txtProductPrice.setAttribute("id","txtProductPrice");
txtProductPrice.setAttribute("value",objProduct.price);
txtProductPrice.setAttribute("style","width:250px;margin-left:48px");
fildset.appendChild(label2);
fildset.appendChild(txtProductPrice);

insertBlankLine(fildset,2);

var txtProductQuan = document.createElement("input");
var label1=document.createElement('label');
label1.innerHTML="Product Quantity :-";
label1.setAttribute('style','font-weight:bold');
txtProductQuan.setAttribute("type","text");
txtProductQuan.setAttribute("id","txtProductQuan");
txtProductQuan.setAttribute("value",objProduct.quan);
txtProductQuan.setAttribute("style","width:250px;margin-left:20px");
fildset.appendChild(label1);
fildset.appendChild(txtProductQuan);

insertBlankLine(fildset,2);


var btnAddButton = document.createElement("button");
btnAddButton.setAttribute("id","btnAddButton");
btnAddButton.innerHTML = "Update Product";
btnAddButton.setAttribute('style','border-radius:12px');
fildset.appendChild(btnAddButton);

    btnAddButton.addEventListener("click", function(event)
{
       
updateProducttoList(objProduct);
     closeNav();  
}
);

 var btnCancelButton = document.createElement("button");
btnCancelButton.setAttribute("id","btnCancelButton");
btnCancelButton.setAttribute("style","margin-left:30px");
btnCancelButton.innerHTML = "Cancel";
btnCancelButton.setAttribute('style','border-radius:12px;margin-left:25px');
fildset.appendChild(btnCancelButton);
divAddProducts.appendChild(fildset);

    btnCancelButton.addEventListener("click", function(event)
{
deleteNewProductPanel();
        closeNav();
createProductPanel2();
}
);
}