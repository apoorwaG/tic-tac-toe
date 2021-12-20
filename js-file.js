const Player = (num) => {
    // bolster this logic later
    let mark = 'x';
    if(num === 1)
        mark = 'o';

    return {mark};
}

const gameBoard = (() => {
    const grid = [];
    for(let i = 0; i < 3; i++){
        grid.push([' ', ' ', ' ']);
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
    };

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
                box.addEventListener('click', function(event) {
                    gameState.advanceGame(event);
                });
                grid.appendChild(box);
            }
        }
    };

    // function to fill a box
    const insertMark = (row, col, player) => {
        const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        box.textContent = player.mark;
    };

    return {loadBoard, insertMark};
})();


// this module will dictate the flow of the game
const gameState = (() => {

    let players = [Player(0), Player(1)];

    // initialize the board
    displayController.loadBoard();

    // displayController.insertMark(0, 0, players[0]);

    // player 1 goes first
    let turn = 0;

    const getTurn = () => turn;
    
    const changeTurn = () => {
        if(turn === 0){
            turn = 1;
        }   
        else if(turn === 1){
            turn = 0;
        }
        else{
            console.log("Hol'up."); 
        }    
    }

    const advanceGame = (event) => {

        const row = +event.target.getAttribute("data-row");
        const col = +event.target.getAttribute("data-col");

        // change the gameBoard internally, with the correct player
        gameBoard.insertMark(row, col, players[getTurn()]);

        // change the visual, with the correct player
        displayController.insertMark(row, col, players[getTurn()]);


        changeTurn();
        // at the end, disable this box so you can't click on it again
        event.target.disabled = true;
    }

    return {changeTurn, getTurn, advanceGame};

})();

