const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');
const h1 = document.querySelector('.h1')

//marking values
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

player1.textContent = `player 1: ' ${currentPlayer} '`;
player2.textContent = `player 2: ' ${nextPlayer} '`;


const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
          if(checkWin()){
            //  console.log(`${playerTurn} is a winner`);
             showAlert(`${playerTurn} is a winner`);
             disableCells();
          }else if(checkTie()){
            //  console.log(`it's a Tie `);
             showAlert(`it's a Tie `);
             disableCells();
          }
          else{
             changePlayerTurn();
          }
     }
}

// function to change player turn
 const changePlayerTurn = () => {
    if(playerTurn === currentPlayer){
         playerTurn = nextPlayer;
    }else{
        playerTurn = currentPlayer;
    }
 }

//  function to check win
 const checkWin = () => {
     const winningConditions = 
     [
        [0 ,1, 2],
        [3 ,4, 5],
        [6 ,7, 8],
        [0 ,4, 8],
        [2 ,4, 6],
        [0 ,3, 6],
        [1 ,4, 7],
        [2 ,5, 8],
     ];
     for(let i = 0; i < winningConditions.length; i++){
        const[pos1, pos2, pos3] = winningConditions[i];

        if(gameCells[pos1].textContent !== '' &&
           gameCells[pos1].textContent === gameCells[pos2].textContent &&
           gameCells[pos2].textContent === gameCells[pos3].textContent) {
            return true;
           }
     }
       
     return false;
  
    }
 //  function to check tie
const checkTie = () => {
     let emptyCellCount = 0;
     gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCellCount++;
        }
     });

     return emptyCellCount === 0 && !checkWin();
}


// function to disable game-board cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled')
    })
}

//function to restart the game

const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent="";
        cell.classList.remove('disabled');
    });
    startGame();
}


//function to alert
const showAlert = (mess) => {
    alertBox.style.display = "block";
    alertBox.textContent = mess;
    h1.style.display='none';
    setTimeout(()=>{
        alertBox.style.display = "none";
        h1.style.display='block';

    },3000)
}
restartBtn.addEventListener('click', restartGame);

startGame();


