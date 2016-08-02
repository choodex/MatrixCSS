//Settings
var MAX_Z_INDEX = 5;
var NUM_DIVS = 10;
var MAX_WIDTH = $('div.container').width();

for(var x = 0; x < NUM_DIVS; x++) {
    createDiv();
}

function createDiv() {
   var aDiv = document.createElement("div");

   var divID = 'stream' + getRandomIntInclusive(0,999);
   aDiv.setAttribute("id", divID);

   aDiv.setAttribute("style", "z-index:" + getRandomIntInclusive(0, MAX_Z_INDEX) + "; left:"+ getRandomIntInclusive(0, MAX_WIDTH) + "px;");

   var text = '';
   for(var x = 0; x < 20; x++) {
       text += "<span>&#" + getRandomIntInclusive(20010, 33300) + ";</span><br/>"
   }
   aDiv.innerHTML = text;

   $("div.container").prepend(aDiv);
   addAnimationToDiv(divID);
}

function addAnimationToDiv(divID) {
   //Get all direct children of the div/stream (i.e. all of the spans)
   var stream = $("div#" + divID + " > span");
   var lastSpanIndex = stream.length - 1;
   var animSpeed = getRandomIntInclusive(900,2900);

   //Add the animation to each span
   stream.each(function(index) {
       $(this).css({
           "animation-name": "flare",
           "animation-duration": "2200ms",
           "animation-delay": (animSpeed*index/lastSpanIndex) + "ms",
           "animation-iteration-count": "1",
           "animation-timing-function": "ease-out",
           "animation-fill-mode": "forwards"
       });
       if(index == lastSpanIndex) {
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
