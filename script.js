//factories
const Player = ([playerType]) => {
    let getPlayerType = () => playerType;
    let playerScore = 0;
    
    function getPlayerScore() {
       return playerScore;
    }
   
    
   
    return {getPlayerScore,
            getPlayerType,
           };
   
   };

//modules 
const gameboard = (() => {
 let _gameboardArray = new Array(9);

 let p1Array = [];
 let p2Array = [];
 const _gameboardDiv = document.querySelector('div.gameboard');
 const _winningPattern = [['n0','n1','n2'], ['n0','n4','n8'], ['n0','n3','n6'], 
                          ['n3','n4','n5'], ['n1','n4','n7'], ['n2','n5','n8'],
                          ['n2','n4','n6'], ['n6','n7','n8']
                        ];
 let gameOver = false;
 let playerTurn = 1;

 const createGameboard = () => {
  if (gameOver) {
   _gameboardArray = new Array(9);
   _gameboardDiv .innerHTML = "";
   gameOver=false;
  }

  for (let i=0 ; i < _gameboardArray.length; i++) {
   let cell = document.createElement('div');
   cell.classList.add('gameboardCell');
   cell.setAttribute('id', `n${i}`);
   cell.textContent = _gameboardArray[i];
   _gameboardDiv .appendChild(cell);
  }
 };

 const setPiece = (numIndex) => {
  let index = numIndex.split('')[1];
  if (_gameboardArray[index] != null) {
    return;
  } else if (playerTurn%2) {
    _gameboardArray[index] = 'O';
    p1Array.push(numIndex);
  } else {
    _gameboardArray[index] = 'X';
    p2Array.push(numIndex);
  }

  let cell = document.querySelector(`#${numIndex}`);
  cell.textContent = _gameboardArray[index];

  playerTurn++;
  if (playerTurn > 5) {
    _checkGameboard();
  }
  
 };
 

 const _checkGameboard = () => {
  let count = 0; 
  while (!gameOver && count < 8) {
    let arr = _winningPattern[count];
    if (_isTrue(p1Array, arr)) {
      displayController.displayWinner(1);
      displayController.deactivateGameboard();
      gameOver = true;
     } else if (_isTrue(p2Array, arr)) {
      displayController.displayWinner(2);
      displayController.deactivateGameboard();
      gameOver = true;
     } 
     count++;
  };

  if (playerTurn > 9 && !gameOver) {
    displayController.displayWinner(0);
    displayController.deactivateGameboard();
    gameOver = true;
   }
 }; 

 function _isTrue(playerArray, winningArray) {
    return winningArray.every(r => playerArray.includes(r));
  };
 
 const toggleGameOver = () => {
    if (!gameOver) {
      gameOver = !gameOver;
    };
    p1Array = [];
    p2Array = [];
    playerTurn = 1;
 }


 return {createGameboard, 
         setPiece,
         toggleGameOver,
        };

})();

const displayController = (() => {
 //add listener for New Game btn
 const startGameBtn = document.querySelector('.resetBtn');

 const startGame = () => {
  startGameBtn.addEventListener('click', (e) => {
    gameboard.toggleGameOver();
    gameboard.createGameboard();
    activateGameboard();
    _hideMessages();
  })};

 function togglePlayerType(buttonVal) {
    //toggle for playing against a computer
    //buttonVal.value = (buttonVal.value=="Player")?"Computer":"Player";
 }

 //add listener for clicking a cell on the gameboard
 const activateGameboard = () => {
  let gameboardCells = document.querySelectorAll('div.gameboardCell');
  gameboardCells.forEach(cell => cell.addEventListener('click', _clickHandler));
 };

 const _clickHandler = function(event) {
  gameboard.setPiece(event.target.getAttribute('id'));
  event.target

 }
 //remove event listener when game is over
 const deactivateGameboard = () => {
  let gameboardCells = document.querySelectorAll('div.gameboardCell');
  gameboardCells.forEach(cell => cell.removeEventListener('click', _clickHandler)
  );
 };

 const displayWinner = (num) => {
  if (num == 0) {
    const tieMessage = document.querySelector('#tie');
    tieMessage.style.visibility = "visible";
  } else if (num == 1) {
    const p1Message = document.querySelector('#p1');
    p1Message.style.visibility = "visible";
  } else {
    const p2Message = document.querySelector('#p2');
    p2Message.style.visibility = "visible";
  };
 };

 const _hideMessages = () => {
    const hideMessage = document.querySelectorAll('.hide');
    hideMessage.forEach(message => message.style.visibility = "");

    const instructionMessage = document.querySelector('.instructions');
    instructionMessage.style.visibility = "hidden";
 };

 startGame();

 return {activateGameboard,
         startGame,
         deactivateGameboard,
         togglePlayerType,
         displayWinner
        }

})();



