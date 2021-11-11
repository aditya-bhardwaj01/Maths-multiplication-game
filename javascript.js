var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on start/reset
document.getElementById("startreset").onclick = 
function(){
    //if we are playing
    if(playing == true){
        location.reload();  //reload page
    }
    else{ //if we are not playing
        
        playing = true; //change mode to playing

        //set score to zero
        score = 0;

        document.getElementById("scorevalue").innerHTML
        = score;

        //show countdown box
        show("timeremaining");

        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML
        = timeremaining;

        //hide game over box
        hide("gameOver");

        //change button to reset
        document.getElementById("startreset").innerHTML
        = "Reset Game";

        //start countdown
        startCountdown();

        //generate new Q&A

        generateQA();
    }
}

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing
    if(playing == true){//yes
    if(this.innerHTML == correctAnswer){
    //correct answer
   
    //increase score by 1
    score++;
   
   document.getElementById("scorevalue").innerHTML = score;
    //hide wrong box and show correct box
    hide("wrong");
    show("correct");
    setTimeout(function(){
    hide("correct");
    }, 1000);
   
    //Generate new Q&A
   
    generateQA();
    // startCountdown();
    }else{
    //wrong answer
    hide("correct");
    show("wrong");
    setTimeout(function(){
    hide("wrong");
    }, 1000);
    }
    }
   }
   }
//if we click on answer box
     //if we are playing
         //correct?
             //yes
                  //increase score by 1
                  //show correct box for 1 sec
                  //generate new Q&A
             //no
                  //show try again box for 1 sec


//functions

//start counter
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;

        document.getElementById("timeremainingvalue").innerHTML
        = timeremaining;

        if(timeremaining==0){// game over
            stopCountdown();

            show("gameOver");

            document.getElementById("gameOver").innerHTML =
             "<p>Game Over!</p> <p>Your Score is " + score + ".</p>";

            hide("timeremaining")

            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML
            = "Start Game";
        }
    }, 1000)
}


//stopcounter
function stopCountdown(){
    clearInterval(action);
}


//hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}


//show certain element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate questions and multipe answers

function generateQA(){
    var x = Math.round(Math.random()*9)+1;
    var y = Math.round(Math.random()*9)+1;

    correctAnswer = x*y;

    document.getElementById("question").innerHTML
    = x+"X" +y;

    var correctPosition = Math.round(Math.random()*3)+1;
    document.getElementById("box" + correctPosition).innerHTML
    = correctAnswer; //fill one box with correct answer

    //fill other boxes with wrong answers

    var answers = [correctAnswer];
    for(i=1; i<5; i++){
        if(i!= correctPosition){
            var wrongAnswer;

            do{
                wrongAnswer = (Math.round(Math.random()*9)+1)*
            (Math.round(Math.random()*9)+1);
            }while(answers.indexOf(wrongAnswer)>-1)

            document.getElementById("box" + i).innerHTML
            = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}