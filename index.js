var buttonColours=["red", "blue", "green", "yellow"]; 
var gamePattern=[];
var userClickedPattern = []; 
var started = false;
var level=0;

$(document).keypress(function(event)//-----1 //start
{
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();//-----2 //
        started = true;// disables keypress after game has started
    }
})

$(".btn").click(function()//!!!!!-----7 //new input from user stored in userClickedPattern array
{
    var userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);//-----8 //
})

function nextSequence()//-----3 //
{
    userClickedPattern = [];//-----4 //reset pattern user had given input
    level++;
    $("#level-title").text("Level " + level);//-----5
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);//-----6 //a new random pattern is pushed into gamePattern array
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])//-----9 // userClickedPattern.length-1 to check last input given by user
    {
        if(currentLevel+1===level)
        {
            setTimeout(function () { nextSequence();}, 1000);
        }
    }
    else 
    {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");//bg color red
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()//reset everything
{
    level=0;
    gamePattern = [];
    started = false;
}