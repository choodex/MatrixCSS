// $("#a").addClass('animFall');
// $("#e").addClass('animFlair');

createDiv('a');

function createDiv(divID) {
   var aDiv = document.createElement("div");
   aDiv.setAttribute("id", divID);
   aDiv.innerHTML = "<span>&#25935;</span><br/><span>&#25463;</span><br/><span>&#30340;</span><br/><span>&#26837;</span><br/><span>&#33394;</span><br/><span>&#29392;</span><br/><span>&#29432;</span>";
   $("body").prepend(aDiv);
   addAnimation(divID);
}

function addAnimation(divID) {
   //Get all direct children
   var column = $("div#" + divID + " > span");
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
               createDiv('d');
           });
       }
   });
} //end myAnimate();
