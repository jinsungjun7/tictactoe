//modules 
let gameboardArray = ['X', 'X', 'O',
                      'X', 'X', 'O',
                      'X', 'X', 'O'];


const gameboard = (() => {
 const gameboardDiv = document.querySelector('div.gameboard');
 for (let i=0 ; i < gameboardArray.length; i++) {
  let cell = document.createElement('div');
  cell.classList.add('gameboardCell');
  cell.textContent = gameboardArray[i];
  gameboardDiv.appendChild(cell);
 };
 
})();

const displayController = (() => {

})();

//factories
const Player = (playerType) => {

};


