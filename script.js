const TIMER_OFF = -1;
var game = false;
var isShuffle = false;
var keySound = true;
var sound = new Audio('KeyPress.mp3');
var victorySound = new Audio('SFX-victory.mp3');


/*swap the cell of input c1 and c2*/
function swap(c1, c2) {
  var temp = document.getElementById(c1).className;
  document.getElementById(c1).className = document.getElementById(c2).className;
  document.getElementById(c2).className = temp;
  //console.log(document.getElementById(c1).className +  " with " + document.getElementById(c2).className);
}

/*onload function*/
function startWeb() {

  //core game
  numberOfMoves = document.getElementById("nom");
  correct = "";
  nom = 0;

  //Timer
  counterOut = document.getElementById("ctrout");
  counter = 0;
  counterTimer = TIMER_OFF;

  //Keyboard control
  window.addEventListener(
    "keydown",
    function (event) { KeyControl(event.key) }
  )

  window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  //displaying
  display();
}

/*start the game*/
function startGame() {
  //console.log(numberOfMoves);
  game = true;
  shuffle(1000);
  nom = 0;
  counter = 0;
  startCounter();
  display();
}

/*search for tile with input tile Number*/
function searchForTile(tNum) {
  for (let r = 1; r < 5; r++) {
    for (let c = 1; c < 5; c++) {
      if (document.getElementById("c" + r + c).className == tNum) {
        correct = "c" + r + c;
        return;
      }
    }
  }
}

/*sorting the table to it's original form*/
function resetGame() {
  var tileNum = 0;
  for (let r = 1; r < 5; r++) {
    for (let c = 1; c < 5; c++) {
      var currentTile = "c" + r + c;
      tileNum++;
      if (document.getElementById(currentTile).className != ("t" + tileNum)) {
        searchForTile("t" + tileNum);
        swap(currentTile, correct);
        correct = "";
      }
    }
  }
  game = false;
  nom = 0;
  counter = 0;
  stopCounter();
  display();
  displayTime();
}

/*shuffle the board
input: how many time you want to shuffle
*/
function shuffle(amount) {
  isShuffle = true;
  var temp = nom;
  for (let i = 0; i < amount; i++) {
    randomR = Math.floor(Math.random() * 4 + 1);
    randomC = Math.floor(Math.random() * 4 + 1);
    clickt(randomR, randomC);
  }
  nom = temp;
  isShuffle = false;
  display();
}

/* Check button to see if you completed the slider puzzle and reveal the secret shuffle*/
function check() {
  var victory = true;
  var tileNum = 0;
  for (let r = 1; r < 5; r++) {
    for (let c = 1; c < 5; c++) {
      var currentTile = "c" + r + c;
      tileNum++;
      if (document.getElementById(currentTile).className != ("t" + tileNum)) {
        victory = false;
      }
    }
  }
  console.log(victory);
  if (victory == true) {
    document.getElementById("victory").style.display = "block";
    if (keySound != false)
    {
      victorySound.loop = false;
      victorySound.volume = 0.7;
      victorySound.play();
    }
    stopCounter();
    game = false;
  }
}

/*click tile base on the row and column */
function clickt(r, c) {
  //console.log(""+r+c)

  if (game == true) {
    var cell = document.getElementById("c" + r + c);
    var tile = cell.className;
    playAudio();
    //console.log(tile);

    /*make sure you are not clicking the white box*/
    if (tile != "t16") {
      /*check if the white box is on your right*/
      if (c < c + 1 && c < 4) {
        if (document.getElementById("c" + r + (c + 1)).className == "t16") {
          //console.log("swapped c" + r + c + " with c" + r + (c+1));
          swap("c" + r + c, "c" + r + (c + 1));
          nom++;
          display();
          if (isShuffle == false) {
            check();
          }
          return;
        }
      }

      /*check if the white box is on your left*/
      if (c > c - 1 && c > 1) {
        if (document.getElementById("c" + r + (c - 1)).className == "t16") {
          //console.log("swapped c" + r + c + " with c" + r + (c-1));
          swap("c" + r + c, "c" + r + (c - 1));
          nom++;
          display();
          if (isShuffle == false) {
            check();
          }
          return;
        }
      }

      /*check if the white box is on your top*/
      if (r > r - 1 && r > 1) {
        if (document.getElementById("c" + (r - 1) + c).className == "t16") {
          //console.log("swapped c" + r + c + " with c" + (r-1) + c);
          swap("c" + r + c, "c" + (r - 1) + c);
          nom++;
          display();
          if (isShuffle == false) {
            check();
          }
          return;
        }
      }

      /*check if the white box is on your bottom*/
      if (r < r + 1 && r < 4) {
        if (document.getElementById("c" + (r + 1) + c).className == "t16") {
          //console.log("swapped c" + r + c + " with c" + (r+1) + c);
          swap("c" + r + c, "c" + (r + 1) + c);
          nom++;
          display();
          if (isShuffle == false) {
            check();
          }
          return;
        }
      }
    }
  }
  else {
    console.log("game not started")
  }
}


//timers code
function count() {
  counter += 1;
  displayTime();
}
function startCounter() {
  if (counterTimer == TIMER_OFF)
    counterTimer = setInterval(count, 1000);
}
function stopCounter() {
  clearInterval(counterTimer);
  counterTimer = TIMER_OFF;
}


/*display the number of moves*/
function display() {
  numberOfMoves.innerHTML = nom;
}

/*display the time*/
function displayTime() {
  counterOut.innerHTML = counter;
}


//Keyboard testing
function MyFunction(the_Key) {
  alert("Key pressed is: " + the_Key);
}

//Keyboard input control
function KeyControl(the_Key) {

  searchForTile("t16");
  var r = correct.substring(1, 2);
  var c = correct.substring(2);
  r = parseInt(r);
  c = parseInt(c);

  switch (the_Key) {
    case "ArrowDown":
    case "s":
      clickt(r - 1, c);
      break;
    case "ArrowUp":
    case "w":
      clickt(r + 1, c);
      break;
    case "ArrowLeft":
    case "a":
      clickt(r, c + 1);
      break;
    case "ArrowRight":
    case "d":
      clickt(r, c - 1);
      break;
    default:
      return;
  }
}


//victory screen
function off() {
  document.getElementById("victory").style.display = "none";
  resetGame();
}

//puzzle solver (testing purpose only)
function autoSolver() {
  var tileNum = 0;
  for (let r = 1; r < 5; r++) {
    for (let c = 1; c < 5; c++) {
      var currentTile = "c" + r + c;
      tileNum++;
      if (document.getElementById(currentTile).className != ("t" + tileNum)) {
        searchForTile("t" + tileNum);
        swap(currentTile, correct);
        correct = "";
      }
    }
  }
  check();
}


//tips showing
function showTips() {
  let onOff = document.getElementById("tips").style.display;
  if (onOff == "block") {
    document.getElementById("tips").style.display = "none";
  }
  else {
    document.getElementById("tips").style.display = "block";
  }
}


//pressSound
function muteButton() {
  keySound = !(keySound);

  switch(keySound) {
    case true:
      document.getElementById("buttonTXT").innerHTML="Mute SFX";
      break;
    case false:
      document.getElementById("buttonTXT").innerHTML="Unmute SFX";
      break;
  }
}

function playAudio() {
  if (keySound != false && isShuffle == false) {
    sound.loop = false;
    sound.volume = 0.7;
    sound.play();
  }
}