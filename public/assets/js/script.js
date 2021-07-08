$(function(){
    var $registerForm = $("#loginFormInput");
    $.validator. addMethod("phoneValidate", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 && 
    phone_number.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/);
}, "Please enter a valid phone number");

    if($registerForm.length){
        $registerForm.validate({
            rules:{
                phone:{
                    required:true,
                    phoneValidate:true
                }
            },
            messages:{
                phone:{
                    required: 'Please enter a valid phone number'
                }
            },
            errorPlacement :function(error, element){
                if(element.is(":radio")){
                    error.appendTo(element.parents(".form-1-div"));
                }
                else{
                    error.insertAfter(element.parents(".form-1-div"));
                }
            }
        })
    }
})




$(function(){
    var $userNewForm = $("#userNewForm");
    $.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9].+)*$/.test(value);
    });
    $.validator.addMethod("pincode", function(value, element) {
        return this.optional(element) || /^[1-9][0-9]{5}$/.test(value);
    });
    $.validator.addMethod("email", function(value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    });
    $.validator.addMethod("address", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s,.'-]{3,}$/.test(value);
    });


    if($userNewForm.length){
        $userNewForm.validate({
            rules:{
                username:{
                    required:true,
                    alphanumeric:true
                    
                },
                email:{
                    required:true,
                    email:true
                },
            },
            errorPlacement: function(){
            return false;  
            }
        })
    }
})




$(document).on('click', '.categories-button', function() {
       $(".categories-button").removeClass("active");
       $(this).addClass("active");
       
   });


 $(document).on('click', '.option-button-skin', function() {
       $(".option-button-skin").removeClass("active");
       $(this).addClass("active");
       
   });
 $(document).on('click', '.option-button-clean', function() {
       $(".option-button-clean").removeClass("active");
       $(this).addClass("active");
       
   });

$(document).on('click', '.option-button-cut', function() {
       $(".option-button-cut").removeClass("active");
       $(this).addClass("active");
       
   });

$(document).on('click', '.option-button-mar', function() {
       $(".option-button-mar").removeClass("active");
       $(this).addClass("active");
       
   });

  $(document).on('click', '.fav-btn', function() {
       $('#favBtn').toggleClass("bi-heart bi-heart-fill");
       $(this).toggleClass("active");
      

   });
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






  $('.delivery-slot-boxes').slick({
  infinite : false,
  swipeToSlide: true,
  speed:50,
  centerMode: false,
  variableWidth: true
});

    $('.address-boxes').slick({
  infinite : false,
  swipeToSlide: true,
  centerMode: false,
  speed:50,
  variableWidth: true
});








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