$( document ).ready(function() {      
    $(".js-drawer-open-desktop-nav button").click(function() {  
        $(".header__inline-menu").toggleClass("open-shop-menu");  
    });   
});

// for collection filter
function myFunction() {
  var x = document.getElementById("myDIV");
  var y = document.getElementById("anotherDIV");
  
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block"; // Show anotherDIV
  } else {
    x.style.display = "none";
    y.style.display = "none"; // Hide anotherDIV
  }
}
document.addEventListener('DOMContentLoaded', function() {
  // Set initial display to none for both elements
  var x = document.getElementById("myDIV");
  var y = document.getElementById("anotherDIV");
  x.style.display = "none";
  y.style.display = "none";
});


jQuery(".footer-block--menu .footer-block__heading").click(function(){
  if($(window).width() <= '749'){
  if(jQuery(this).hasClass("show"))
        {
          jQuery(this).removeClass("show");jQuery(this).next().slideUp();}
  else
        {
          jQuery(".footer-block--menu .footer-block__heading").removeClass("show");
          jQuery(".footer-block--menu .footer-block__heading").next().slideUp();
          jQuery(this).addClass("show");jQuery(this).next().slideDown();
        }
    }
});
