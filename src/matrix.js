//Settings
var MAX_Z_INDEX = 2;
var MAX_WIDTH = $('div.container').width() - 30;
var MAX_HEIGHT = $('div.container').height() - 30;
var CONTAINER_OFFSET_Y = $('div.container').offset().left;
var NUM_DIVS = Math.floor(MAX_WIDTH / 30);   //Estimating high; 30px is average width of a character
var NUM_SPANS = Math.floor(MAX_HEIGHT / 23);

for(var x = 0; x < NUM_DIVS; x++) {
    createDiv();
}

function createDiv() {
    var aDiv = document.createElement("div");

    var divID = 'stream' + getRandomIntInclusive(0, 999);
    aDiv.setAttribute("id", divID);

    aDiv.setAttribute("class", "stream");
    aDiv.setAttribute("style", "z-index:" + getRandomIntInclusive(0, MAX_Z_INDEX) + "; left:" + (getRandomIntInclusive(0, MAX_WIDTH) + CONTAINER_OFFSET_Y) + "px;");

    var text = '';
    for(var x = 0; x < NUM_SPANS; x++) {
        text += "<span>" + getCharacterEncoding() + "</span><br/>"
    }
    aDiv.innerHTML = text;

    $("div.container").prepend(aDiv);
    addAnimationToDiv(divID);
}

function addAnimationToDiv(divID) {
    //Get all direct children of the div/stream (i.e. all of the spans)
    var stream = $("div#" + divID + " > span");
    var lastSpanIndex = stream.length - 1;
    var animSpeed = getRandomIntInclusive(900, 2900);

    //Add the animation to each span
    stream.each(function (index) {
        $(this).css({
            "animation-name": "flare",
            "animation-duration": "2200ms",
            "animation-delay": (animSpeed * index / lastSpanIndex) + "ms",
            "animation-iteration-count": "1",
            "animation-timing-function": "ease-out",
            "animation-fill-mode": "forwards"
        });
        if(index == lastSpanIndex) {
            //Just once, after the last span animates
            $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                    //Make a new div and remove this one from DOM
                    createDiv();
                    $("div#" + e.currentTarget.parentNode.id).remove();
                });
        }
    });
} //end myAnimate();

function getCharacterEncoding() {
    //Char encodings for half-width kana characters
    //Could also include characters in range 383-450, for Latin chars
    return "&#" + getRandomIntInclusive(65381, 65437) + ";";
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
