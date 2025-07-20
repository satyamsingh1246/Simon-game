var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highScore = 0;

// Start game on keypress or tap
$(document).on("keypress touchstart", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Button click/tap
$(".btn").on("click touchstart", function (e) {
  e.preventDefault(); // avoid double event
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Check user answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    $("#level-title").text("Game Over, Press Any Key or Tap to Restart");
    updateHighScore();
    startOver();
  }
}

// Generate next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

// Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Update high score
function updateHighScore() {
  if (level > highScore) {
    highScore = level - 1;
    $("#high-score").text(highScore);
  }
}

// Theme toggle
$("#theme-toggle").on("click", function () {
  $("body").toggleClass("light");
});
