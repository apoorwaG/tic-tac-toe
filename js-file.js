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
        grid.push(['', '', '']);
    }

    // finish the logic here
    const insertMark = (row, col, player) => {
        grid[row][col] = player.mark;
    }
    const getMark = (row, col) => {
        return grid[row][col];
    }

    const resetBoard = () => {
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                grid[row][col] = '';
            }
        }
    }

    return {grid, insertMark, getMark, resetBoard};

})();


// display module.
// all things to update front end display go here
const displayController = (() => {

    // initial function to load the game board in HTML
    const loadBoard = () => {
        const grid = document.querySelector(".grid")
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                const box = document.createElement("div");
                box.textContent = gameBoard.getMark(row, col);
                box.classList.add("box");
                box.setAttribute('data-row', `${row}`);
                box.setAttribute('data-col', `${col}`);
                box.setAttribute('style', `flex: 0 0 ${100/3}%`);
                grid.appendChild(box);
            }
        }
    };

    return {loadBoard};
})();


const gameState = (() => {

    let player1 = Player(1);
    let player2 = Player(2);

    // initialize the board
    displayController.loadBoard();

    // player 1 goes first
    let turn = 1;
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

    return {}

})();

