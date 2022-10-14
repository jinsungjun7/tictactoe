//modules 
const gameboard = (() => {
 let _gameboardArray = new Array(9);

 let p1Array = new Array();
 let p2Array = new Array();
 const _gameboardDiv = document.querySelector('div.gameboard');
 const _winningPattern = [['0','1','2'], ['0','4','8'], ['0','3','6'], 
                          ['3','4','5'], ['1','4','7'], ['2','5','8'],
                          ['2','4','6'], ['6','7','8']
                        ];
 let gameOver = false;
 let playerTurn = 1;

 const createGameboard = () => {
  if (gameOver) {
   _gameboardArray = new Array(9);
   _gameboardDiv .innerHTML = "";
   toggleGameOver();
  }

  for (let i=0 ; i < _gameboardArray.length; i++) {
   let cell = document.createElement('div');
   cell.classList.add('gameboardCell');
   cell.setAttribute('id', `n${i}`);
   cell.textContent = _gameboardArray[i];
   _gameboardDiv .appendChild(cell);
  }
 };

 const setPiece = (index) => {
  let numIndex = index.split('')[1]; 

  if (_gameboardArray[numIndex] != null) {
   return;
  } else if (playerTurn%2) {
    _gameboardArray[numIndex] = 'O';
    p1Array.push(numIndex);
  } else {
    _gameboardArray[numIndex] = 'X';
    p2Array.push(numIndex);
  }

  let cell = document.querySelector(`#n${numIndex}`);
  cell.textContent = _gameboardArray[numIndex];
  playerTurn++;
  if (playerTurn >= 5) {
    _checkGameboard();
  }
 };
 

 const _checkGameboard = () => {
  _winningPattern.every(arr => {
   if (_isTrue(p1Array, arr)) {
    alert("PLAYER 1 WINS!");
    toggleGameOver();
   } else if (_isTrue(p2Array, arr)) {
    alert("PLAYER 2 WINS!");
    toggleGameOver();
   } else if (playerTurn > 9) {
    alert("IT'S A TIE!");
    toggleGameOver();
   } else {
    return;
   }
  });
 }; 

 function _isTrue(playerArray, winningArray) {
    return winningArray.every(r => playerArray.includes(r));
  };

 const getGameboard = () => {
    return _gameboardArray;
 }
 
 const toggleGameOver = () => {
    gameOver = !gameOver;
 }

 return {createGameboard, 
         setPiece,
         getGameboard,
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
  })};

 //add listener for clicking a cell on the gameboard
 const activateGameboard = () => {
  let gameboardCells = document.querySelectorAll('div.gameboardCell');
  gameboardCells.forEach(cell => cell.addEventListener('click', (e) => {
  gameboard.setPiece(cell.getAttribute('id'));  
 }))};

 startGame();

 return {activateGameboard,
         startGame,
        }

})();

//factories
const Player = (playerType) => {

};

