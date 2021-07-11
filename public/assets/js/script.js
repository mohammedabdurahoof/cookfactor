

      

  $(document).on('click', '.add-to-cart', function() {
       $('.go-to-cart-button').toggleClass("active");
       $(this).toggleClass("active");
      

   });

  


$(document).on('click', '.delete-button', function() {
       $(".delete-confirm ").addClass("active");
   });

$(document).on('click', '.cancel-btn', function() {
       $(".delete-confirm ").removeClass("active");
   });


$(document).on('click', '.delivery-button', function() {
       $(".select-delivery ").addClass("active");
   });

$(document).on('click', '.cancel-btn', function() {
       $(".select-delivery ").removeClass("active");
   });

$(document).on('click', '.delivery-slot-box', function() {
       $(".delivery-slot-box").removeClass("active");
       $(this).addClass("active");
       
   });

$(document).on('click', '.delivery-box', function() {
       $(".delivery-box").removeClass("active");
       $(this).addClass("active");
       
   });

$(document).on('click', '.address-box', function() {
       $(".address-box").removeClass("active");
       $(this).addClass("active");
       
   });




$(document).on('click', '.delivery-button', function() {
       $(".select-delivery ").addClass("active");
   });

$(document).on('click', '.cancel-btn', function() {
       $(".select-delivery ").removeClass("active");
   });

var new_width = $('#container').width();
$('.cart-footer').width(new_width); 

var new_width = $('#container').width();
$('.go-to-cart-button').width(new_width); 













var modal = document.getElementsByClassName('modal');


var btn = document.getElementsByClassName("order-summary-button");



var span = document.getElementsByClassName("close-btn");

 
btn[0].onclick = function() {
    modal[0].style.display = "block";

}

btn[1].onclick = function() {
    modal[1].style.display = "block";
}

span[0].onclick = function() {
    modal[0].style.display = "none";
}

span[1].onclick = function() {
    modal[1].style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal[0]) {
         modal[0].style.display = "none";
     }
    if (event.target == modal[1]) {
         modal[1].style.display = "none";
     }  
}