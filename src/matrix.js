// $("#a").addClass('animFall');
// $("#e").addClass('animFlair');

createDiv();
createDiv();
createDiv();

function createDiv() {
   var aDiv = document.createElement("div");
   var divID = 'aDiv' + getRandomIntInclusive(0,10000);
   aDiv.setAttribute("id", divID);
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
           //Just once, create a new Div to replace this one, and remove this one.
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
