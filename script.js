// specify variable based on CSS classes
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
image = document.querySelector(".image"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");
playArea = document.querySelector(".play-area"); 
playerXScoreDisplay = document.getElementById("playerXScore"),
playerOScoreDisplay = document.getElementById("playerOScore");

let playerXIcon = "fas fa-times",
    playerOIcon = "far fa-circle",
    playerSign = "X",
    runBot = true,
    playerXScore = 0,
    playerOScore = 0;


window.onload = ()=>{
    // make sure all the boxes in the board are clickable
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const startButtons = document.querySelectorAll('.popup .start-btn');
    
    startButtons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        event.preventDefault(); 
        const popup = this.closest('.popup');
        popup.style.display = 'none'; 
      });
    });
  });
  

//settings popup
function toggleSettingsPopup() {
    const settingsPopup = document.getElementById("settingsPopup");
    settingsPopup.classList.toggle("show");
  }


  function forfeitGame() {
    resultBox.classList.add("show");
    wonText.textContent = "YOU FORFEITED!";

    toggleSettingsPopup();
    playBoard.style.display = "none";
    selectBox.style.display = "none";
    image.style.display = "none";
    footer.style.display = "none";
}
function goHome() {
    window.location.href = 'index.html'; 

    
    toggleSettingsPopup();
    playArea.style.display = "none";
}

selectBtnX.onclick = ()=>{
    image.classList.add("hidden");
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = ()=>{ 
    image.classList.add("hidden");
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}
//???????
let playerMoved = false;
let playerTurn = true;


function clickedBox(element) {
    if (playerTurn && !element.innerHTML) {
        if (players.classList.contains("player")) {
            playerSign = "O";
            element.innerHTML = `<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            element.setAttribute("id", playerSign);
            element.querySelector("i").classList.add("blue-icon"); 
        } else {
            element.innerHTML = `<i class="${playerXIcon}"></i>`;
            element.setAttribute("id", playerSign);
            players.classList.add("active");
              element.querySelector("i").classList.add("red-icon"); 
        }
        selectWinner();
        element.style.pointerEvents = "none";
        playBoard.style.pointerEvents = "none";
        playerTurn = false; 

        // buffer time to pretend that the AI's thinking
        let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(() => {
            bot(runBot);
        }, randomTimeDelay);
    }
}

function bot() {
    if (!playerTurn) { 
        let array = [];
        if (runBot) {
            playerSign = "O";
    
            for (let i = 0; i < allBox.length; i++) {
                if (allBox[i].childElementCount == 0) {
                    array.push(i);
                }
            }
            
            let randomBox = array[Math.floor(Math.random() * array.length)];
            if (array.length > 0) {
                if (players.classList.contains("player")) {
                    playerSign = "X"; 
                    allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                    allBox[randomBox].setAttribute("id", playerSign);
                    players.classList.add("active");
                    allBox[randomBox].querySelector("i").classList.add("red-icon"); 
                } else {
                    allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                    players.classList.remove("active");
                    allBox[randomBox].setAttribute("id", playerSign);
                    allBox[randomBox].querySelector("i").classList.add("blue-icon"); 
                }
                selectWinner(); 
            }
            allBox[randomBox].style.pointerEvents = "none"; 
            playBoard.style.pointerEvents = "auto";
            playerSign = "X";
        }
        playerTurn = true; 
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
    return false;
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);

     
        if (playerSign === "X") {
            playerXScore++;
            playerXScoreDisplay.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreDisplay.textContent = playerOScore;
        }

        if (playerXScore === 3 || playerOScore === 3) {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `PLAYER ${playerSign} WINS!`;
        } else {
            setTimeout(() => {
                clearBoard();
            }, 700);
        }
    } else {
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            setTimeout(() => {
                clearBoard();
            }, 700);
        }
    }
}

function clearBoard() {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].innerHTML = '';
        allBox[i].removeAttribute('id');
        allBox[i].style.pointerEvents = 'auto';
    }
    runBot = true;
    playerSign = "X";
    updatePlayerTurn(playerSign);
    playBoard.style.pointerEvents = 'auto';
}


// reload 
replayBtn.onclick = () => {
    window.location.reload();
    
}

