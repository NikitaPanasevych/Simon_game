var buttonColor = ["green", "yellow", "blue", "red"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var wrongSound = new Audio("sounds/wrong.mp3");

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(currentColor){
    var audio = new Audio("sounds/"+currentColor+".mp3")
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.round(Math.random() * 3);
    var randomChooseColor = buttonColor[randomNumber];
    gamePattern.push(randomChooseColor);
    $("#"+randomChooseColor).fadeIn().fadeOut(100).fadeIn(100);
    playSound(randomChooseColor);
    animatePress(randomChooseColor);
    level++;
    $("h1").text("level "+level); 
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      console.log("wrong");
    $("body").css("background-color","red");
    setTimeout(function(){$("body").css("background-color","#011F3F");},200);
    $("h1").text("GAME OVER press any key to restart");
    wrongSound.play();
    startOver();
    }}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function(){
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   $("#"+userChosenColor).fadeIn().fadeOut(100).fadeIn(100);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
  }); 
 









