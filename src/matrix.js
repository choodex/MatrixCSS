//Settings
var MAX_Z_INDEX = 5;
var NUM_DIVS = 20;
var DOC_WIDTH = $(window).width();  //Limit to size of viewport for now


for(var x = 0; x < NUM_DIVS; x++) {
    createDiv();
}

function createDiv() {
   var aDiv = document.createElement("div");
   var divID = 'aDiv' + getRandomIntInclusive(0,10000);
   var yPos = getRandomIntInclusive(0, DOC_WIDTH);
   aDiv.setAttribute("id", divID);
   aDiv.setAttribute("style", "z-index:" + getRandomIntInclusive(0,MAX_Z_INDEX) + "; left:"+ yPos + "px;")
   aDiv.innerHTML = "<span>&#25935;</span><br/><span>&#25463;</span><br/><span>&#30340;</span><br/><span>&#26837;</span><br/><span>&#33394;</span><br/><span>&#29392;</span><br/><span>&#29432;</span>";
   $("body").prepend(aDiv);
   addAnimation(divID);
}

function addAnimation(divID) {
   //Get all direct children (i.e. the spans)
   var column = $("div#" + divID + " > span");
   var lastIndex = column.length - 1;
   var animSpeed = getRandomIntInclusive(300,2900);

   column.each(function(index) {
       $(this).css({
           "animation-name": "flair",
           "animation-duration": "2200ms",
           "animation-delay": (animSpeed*index/lastIndex) + "ms",
           "animation-iteration-count": "1",
           "animation-timing-function": "ease-out"
       });
       if(index == lastIndex) {
           //Just once, after the last span animates
           $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
              function(e) {
                  createDiv();
                  $("div#" + e.currentTarget.parentNode.id).remove();
              });
       }
   });
} //end myAnimate();


// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
