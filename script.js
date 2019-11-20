var decode=decodeURIComponent(document.cookie);
var cook=decode.split(";");
if(String(cook[1]).match("Admin"))
    {
      window.location.href="homePortal.html";   
    }
else if(!String(cook[1]).match("kkk")&&!String(cook[1]).match(""))
    {
       
        window.location.href="view.html";
    }



$(function() {
  $("button").on("click", function () {
    $.ajax({
      type: 'GET',
      url: '/orders',
      
    });
  });
});