var buttonColours = [];
buttonColours.push("red", "blue", "green", "yellow");

var gamePattern = [];

var userClickedPattern = [];

var level = 1;

var started = false;

var i = 0;

$(document).keydown(function() {
  if (started) {
    console.log("The game has been already started");
  } else {
    nextSequence();
    started = !started;
  }
})

$(".key").click(function(){
  nextSequence();
  started = !started;
});

function nextSequence() {
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

  level++;

  userClickedPattern = [];

  i = 0;
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userChosenColour);
});

function playSound(name) {
  var buttonSound = new Audio ("sounds/"+name+".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (currentLevel === gamePattern[i]) {

    if (i===gamePattern.length-1){
    setTimeout(function() { nextSequence(); }, 1000);
    }
  } else {
    gameOver();
  }
  i++;
}

function gameOver() {
  var gameOverSound = new Audio ("sounds/wrong.mp3");
  gameOverSound.play();

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");

  startOver();
}

function startOver() {
  started = !started;

  level = 1;

  gamePattern = [];
}
