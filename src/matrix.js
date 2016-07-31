// $("#a").addClass('animFall');
// $("#e").addClass('animFlair');

myAnimate();

function myAnimate() {

   //Get all direct children
   var column = $("div > span");
   var lastIndex = column.length - 1;

   column.each(function(index) {
       $(this).css({
        "animation-name": "flair",
        "animation-duration": "2.2s",
        "animation-delay": (index/2) + "s",
        "animation-iteration-count": "1",
        "animation-timing-function": "ease-out"
       });
       if(index == lastIndex) {
           $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
           function(e) {
               //repeat once
               myAnimate();
           });
       }
   });
} //end myAnimate();
