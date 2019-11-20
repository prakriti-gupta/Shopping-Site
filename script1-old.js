 var products=[];
var prid=1;
var check=true;
var aAddProduct=document.getElementById("aAddProduct");
var showProductList=document.getElementById("showProductList");
var divAddProducts=document.getElementById("divAddProducts");
var divListProducts=document.getElementById("divListProducts");

aAddProduct.addEventListener("click",function(event)
{
    if(check)
createProductPanel();
divAddProducts.setAttribute("style","visibility:visible");
    check=false;
}
);


showProductList.addEventListener("click",function(event)
{

}
);
function insertBlankLine(target,n)
{
for(var i=0;i<n;i++)
{
var br = document.createElement("br");
    target.appendChild(br);
}
}

function deleteProductDiv(e)
{
var targetParent = event.target.parentNode;
      console.log(targetParent);
var selectedProductIndex = getProductIndex(targetParent.id); 
    console.log(targetParent.id);
   // deleteFromDataBase(products[selectedProductIndex].prid);
    removeFromProductsArray(selectedProductIndex);
    targetParent.parentNode.removeChild(targetParent);

} 


function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
{
        if (products[i].prid == id) 
return i;
    }
}


function removeFromProductsArray(selectedProductIndex)
{
products.splice(selectedProductIndex,1);

}

function editProductDiv(event)
{
deleteNewProductPanel2();
//var objProduct = new Object();
var targetParent = event.target.parentNode;
var id = targetParent.id; 
for(var i=0;i<products.length;i++)
{
if (products[i].prid == id) 
{
createProductPanel2(products[i]);

break;
}
}

storeProducts();
}



function updateProducttoList(id)
{
var objProduct1 = new Object();
objProduct1.prid=id;
objProduct1.name=document.getElementById("txtProductName").value;
objProduct1.desc=document.getElementById("txtProductDesc").value;
objProduct1.price=document.getElementById("txtProductPrice").value;
objProduct1.quan=document.getElementById("txtProductQuan").value;
    
for(var i=0;i<products.length;i++)
{
if(id==products[i].prid)
{
products[i]=objProduct1;
break;
}
}

    updateFromDatabase(objProduct1);

deleteNewProductPanel2();

storeProducts();
}


function updateFromDatabase(objProduct1){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/homePortal/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(objProduct1));
}



function hideAddNewProductLink()
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
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProducts.removeChild(childNodes[i]);
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
objProduct.prid=products[products.length-1].prid;
    console.log("hello",prid);
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
    
prid++;
console.log(products);
deleteNewProductPanel();


}
}

function storeProducts()
{
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
   // deleteDOM();
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
    products = JSON.parse(xhttp.responseText);
     
    prid = products[products.length-1].prid+1;
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
divProduct.setAttribute("id", objProduct.prid);


var lblProductName = document.createElement("label");
lblProductName.innerHTML = "Name : "+objProduct.name;
divProduct.appendChild(lblProductName);

     insertBlankLine(divProduct,1);


var lblProductDesc = document.createElement("label");
lblProductDesc.innerHTML = "Description : "+objProduct.desc;
    divProduct.appendChild(lblProductDesc);

    insertBlankLine(divProduct,1);

var lblProductPrice = document.createElement("label");
lblProductPrice.innerHTML = "Price : "+objProduct.price;
divProduct.appendChild(lblProductPrice);

    insertBlankLine(divProduct,1);

var lblProductQuan = document.createElement("label");
lblProductQuan.innerHTML = "Quantity : "+ objProduct.quan;
divProduct.appendChild(lblProductQuan);

    insertBlankLine(divProduct,2);	


var buttonEdit = document.createElement("button");
buttonEdit.innerHTML = "edit";
divProduct.appendChild(buttonEdit);
buttonEdit.addEventListener("click",function(event)
{
editProductDiv(event);

});

var buttonDelete = document.createElement("button");
buttonDelete.innerHTML = "Delete";
buttonDelete.setAttribute("style","margin-left:20px");
divProduct.appendChild(buttonDelete);
divListProducts.appendChild(divProduct);
buttonDelete.addEventListener("click",function(event)
{
deleteProductDiv(event);
});

    insertBlankLine(divProduct,3);


}








function createProductPanel()
{



var txtProductName = document.createElement("input");
txtProductName.setAttribute("type","text");
txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
txtProductName.setAttribute("style","width:400px");
divAddProducts.appendChild(txtProductName);	

insertBlankLine(divAddProducts,2);

    var txtProductDesc = document.createElement("input");
txtProductDesc.setAttribute("type","text");
txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
txtProductDesc.setAttribute("style","width:400px; height:50px");
divAddProducts.appendChild(txtProductDesc);	

insertBlankLine(divAddProducts,2);

var txtProductPrice = document.createElement("input");
txtProductPrice.setAttribute("type","text");
txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
txtProductPrice.setAttribute("style","width:400px");
divAddProducts.appendChild(txtProductPrice);	

insertBlankLine(divAddProducts,2);

var txtProductQuan = document.createElement("input");
txtProductQuan.setAttribute("type","text");
txtProductQuan.setAttribute("id","txtProductQuan");
    txtProductQuan.setAttribute("placeholder", "Enter the product Quantity");	
txtProductQuan.setAttribute("style","width:400px");
divAddProducts.appendChild(txtProductQuan);	

insertBlankLine(divAddProducts,2);

var btnAddButton = document.createElement("button");
btnAddButton.setAttribute("id","btnAddButton");
btnAddButton.innerHTML = "Add Product";
divAddProducts.appendChild(btnAddButton);	

    btnAddButton.addEventListener("click", function(event)
{
addProducttoList();
        check=true;
}
);	

    var btnCancelButton = document.createElement("button");
btnCancelButton.setAttribute("id","btnCancelButton");
btnCancelButton.setAttribute("style","margin-left:30px");
btnCancelButton.innerHTML = "Cancel";
divAddProducts.appendChild(btnCancelButton);	

    btnCancelButton.addEventListener("click", function(event)
{
        check=true;
deleteNewProductPanel();

}
);

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




function createProductPanel2(objProduct)
{

var txtProductName = document.createElement("input");
txtProductName.setAttribute("type","text");
txtProductName.setAttribute("id","txtProductName");
 txtProductName.setAttribute("value",objProduct.name);	
txtProductName.setAttribute("style","width:400px");
divAddProducts.appendChild(txtProductName);	

insertBlankLine(divAddProducts,2);

    var txtProductDesc = document.createElement("input");
txtProductDesc.setAttribute("type","text");
txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("value",objProduct.desc);	
txtProductDesc.setAttribute("style","width:400px; height:50px");
divAddProducts.appendChild(txtProductDesc);	

insertBlankLine(divAddProducts,2);

var txtProductPrice = document.createElement("input");
txtProductPrice.setAttribute("type","text");
txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("value",objProduct.price);	
txtProductPrice.setAttribute("style","width:400px");
divAddProducts.appendChild(txtProductPrice);	

insertBlankLine(divAddProducts,2);

var txtProductQuan = document.createElement("input");
txtProductQuan.setAttribute("type","text");
txtProductQuan.setAttribute("id","txtProductQuan");
    txtProductQuan.setAttribute("value",objProduct.quan);	
txtProductQuan.setAttribute("style","width:400px");
divAddProducts.appendChild(txtProductQuan);	

insertBlankLine(divAddProducts,2);


var btnAddButton = document.createElement("button");
btnAddButton.setAttribute("id","btnAddButton");
btnAddButton.innerHTML = "Update Product";
divAddProducts.appendChild(btnAddButton);	

    btnAddButton.addEventListener("click", function(event)
{
updateProducttoList(objProduct.id);
}
);	


    function deleteDOM()
{
   var childNodes = divListProducts.childNodes;
 
    childNodes.length=0;
   for (var i = 0; childNodes.length > 0;)
   {
     
     divListProducts.removeChild(childNodes[i]);
   }  
}


    var btnCancelButton = document.createElement("button");
btnCancelButton.setAttribute("id","btnCancelButton");
btnCancelButton.setAttribute("style","margin-left:30px");
btnCancelButton.innerHTML = "Cancel";
divAddProducts.appendChild(btnCancelButton);	

    btnCancelButton.addEventListener("click", function(event)
{
deleteNewProductPanel();
createProductPanel2();
}
);
}




