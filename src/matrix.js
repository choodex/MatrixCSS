//Settings
var MAX_Z_INDEX = 50;
var NUM_DIVS = 10;
var DOC_WIDTH = $(window).width();  //Limit to size of viewport for now

var currentZ = 0;
for(var x = 0; x < NUM_DIVS; x++) {
    createDiv();
}

function createDiv() {
   var aDiv = document.createElement("div");

   var divID = 'aDiv' + getRandomIntInclusive(0,10000);
   aDiv.setAttribute("id", divID);

   aDiv.setAttribute("style", "z-index:" + currentZ + "; left:"+ getRandomIntInclusive(0, DOC_WIDTH) + "px;");

   var text = '';
   for(var x = 0; x < 20; x++) {
       text += "<span>&#" + getRandomIntInclusive(20010, 33300) + ";</span>"
   }
   aDiv.innerHTML = text;

   $("body").prepend(aDiv);
   addAnimationToDiv(divID);

   (currentZ > MAX_Z_INDEX) ? currentZ = 0 : currentZ += 1;
}

function addAnimationToDiv(divID) {
   //Get all direct children (i.e. the spans)
   var column = $("div#" + divID + " > span");
   var lastIndex = column.length - 1;
   var animSpeed = getRandomIntInclusive(900,2900);

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
       } //else {
      //     //Just once, after the last span animates
      //     $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      //        function(e) {
      //           e.currentTarget.textContent = '&nbsp;';
      //        });
      //  }
   });
} //end myAnimate();


// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
