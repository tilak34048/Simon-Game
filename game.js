var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];    //What is the game pattern corresponding to new sequence
var userClickPattern=[];  //what user has clicked

var started = false;
var level=0;


$(document).keypress(function(){  // check when a key is pressed
if(!started){

  $("#level-title").text("Level "+ level);
  nextSequence();       //Start the game
  started=true;
}
});

$(".btn").click(function(){  //To find out which button got clicked
  var userChosenColour=$(this).attr("id");  //userChosenColour= what the id to the respective colour
  userClickPattern.push(userChosenColour); //push userClicked button to the arr

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickPattern.length-1);  //pass value till length to checkAnswer function
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]=== userClickPattern[currentLevel]){
  console.log("Success");   //if gamePattern=userClickedPAttern then you are successful

  if(userClickPattern.length === gamePattern.length){   //Whwn the lenght of both array are same then start the nextSequence again either stop that
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}else{
  playSound("wrong"); //Adding sound to the particular button

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over"); // Remove game-over class after 200ms
  }, 200);

  $("#level-title").text("Game Over, press Any key to Restart"); //Change the text
  startOver();
}
}

function startOver(){  //Restart the game again
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence(){ ///Function used to create a new gamePattern
userClickPattern=[];
level++; //increase the value of the level by 1
$("#level-title").text("Level "+ level); //Update the text of the level

  var randomNumber=Math.floor(Math.random()*4);  //used to generate a new randomPattern

  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);   //Push the next randomColour to the arr

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Finding id in the entire document with relevant colourname then animating it
playSound(randomChosenColour);


}


function playSound(name){ //Function to play the desired sound
  var audio = new Audio("sounds/" + name + ".mp3"); //Adding sound to the particular button
audio.play();
}


//Animate function when user click the particular key
function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");  //Apply pressed css class on the button which user select

setTimeout(function(){
  $("#" + currentColour).removeClass("pressed"); // Remove pressed class after 100ms
}, 100);
}
