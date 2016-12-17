var countDown = 10;

function countdownTimer() {
    countDown = countDown - 1
  
    $("#seconds").text(countDown)
     if (countDown == 0) {
          window.location.href="../HTML/gamepage.html"
     }
     else{
         window.setTimeout(countdownTimer, 1000); 
     }
}

$(document).ready(function() {
    $.getJSON("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+gif+"&rating=pg", function(response) {
        $('#img').append("<img src='" + response.data.image_url + "'/>");
    });
    
    window.setTimeout(function() {
        $("#suck").html("Game Starting in:<span id='seconds'>10</span>");
        window.setTimeout(countdownTimer, 1000);
    }, 3000);
var score=$.url("?").score;
$("#score").text(score)

});
