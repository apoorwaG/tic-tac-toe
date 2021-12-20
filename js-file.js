const Player = (num) => {
    // bolster this logic later
    let mark = 'x';
    if(num === 2)
        mark = 'o';

    return {mark};
}

const gameBoard = (() => {
    const grid = [];
    for(let i = 0; i < 3; i++){
        grid.push(['x', 'o', 'x']);
    }

    // finish the logic here
    const insertMark = (row, col, player) => {
        grid[row][col] = player.mark;
    }
    const getMark = (row, col) => {
        return grid[row][col];
    }
    return {grid, insertMark, getMark};

})();


const loadBoard = () => {
    const grid = document.querySelector(".grid");
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            const box = document.createElement("div");
            box.textContent = gameBoard.getMark(row, col);
            box.classList.add("box");
            box.setAttribute('data-row', `${row}`);
            box.setAttribute('data-col', `${col}`);
            grid.appendChild(box);
        }
    }
}


const gameState = (() => {

    let player1 = Player(1);
    let player2 = Player(2);
    // player 1 goes first
    let turn = 1;


    const getTurn = () => turn;

    const changeTurn = () => {
        if(turn === 1){
            turn = 2;
        }   
        else if(turn === 2){
            turn = 1;
        }
        else{
            console.log("Hol'up."); 
        }    
    }

    return {changeTurn, getTurn}

})();

console.log(gameState.getTurn());
gameState.changeTurn();

console.log(gameState.getTurn());

