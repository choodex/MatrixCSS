//Settings
var MATRIX_DIV_CLASS = 'div.matrixScreen';
var MAX_Z_INDEX = 3;
var MAX_WIDTH;
var MAX_HEIGHT;
var CONTAINER_OFFSET_Y;
var NUM_DIVS;
var NUM_SPANS;

refreshSettings();

function refreshSettings() {
    $("div[id^=stream]").remove();

    MAX_WIDTH = $(MATRIX_DIV_CLASS).width() - 30;
    MAX_HEIGHT = $(MATRIX_DIV_CLASS).height();
    CONTAINER_OFFSET_Y = $(MATRIX_DIV_CLASS).offset().left;
    NUM_DIVS = Math.floor(MAX_WIDTH / 30);   //Estimating high; 30px is average width of a character
    NUM_SPANS = Math.floor(MAX_HEIGHT / 20);

    for(var x = 0; x < NUM_DIVS; x++) {
        createStream();
    }
}

//Each div represents a single 'stream' of characters
function createStream() {
    var aDiv = document.createElement("div");
    var aRandom = getRandomIntInclusive(0, 500);

    var streamID = 'stream' + aRandom;
    aDiv.setAttribute("id", streamID);

    aDiv.setAttribute("class", "stream");
    aDiv.setAttribute("style", "z-index: " + (aRandom % MAX_Z_INDEX));

    $(MATRIX_DIV_CLASS).prepend(aDiv);    

    refreshStreamContent(streamID);
}

//Add a new set of spans to the given Stream. Includes adding the animation as well.
function refreshStreamContent(streamID) {
    var aDiv = $('#' + streamID);
    var animSpeed = getRandomIntInclusive(900, 3600);    
    var text = '';

    for(var x = 0; x < NUM_SPANS; x++) {
        text += "<span style='animation-name:flare;" +
                             "animation-duration:2200ms;" +
                             "animation-delay:"+ (animSpeed * x / NUM_SPANS) + "ms;" +
                             "animation-iteration-count:1;" +
                             "animation-timing-function: ease-out;" +
                             "'>" + getCharacterEncoding() + "</span><br/>";
    }
    $(aDiv).html(text);

    //Update to new random position
    $(aDiv).css("left", (getRandomIntInclusive(0, MAX_WIDTH) + CONTAINER_OFFSET_Y) + "px");
    
    $("#" + streamID + " > span:last").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            refreshStreamContent(streamID);
        });
}

//Char encodings for half-width kana characters
//Could also include some Latin chars in range 383-450
function getCharacterEncoding() {
    return "&#" + getRandomIntInclusive(65381, 65437) + ";";
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(window).resize(function() {
    refreshSettings();
});