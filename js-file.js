const Player = (num) => {
    // bolster this logic later
    let mark = 'x';
    if(num === 1)
        mark = 'o';

    return {mark};
};

// game board object. change/check state of the game board here.
const gameBoard = (() => {
    const grid = [];
    let slots = 9;
    
    const initializeBoard = () => {
        for(let i = 0; i < 3; i++){
            grid.push(['', '', '']);
        }
    }

    // finish the logic here
    const insertMark = (row, col, player) => {
        slots -= 1;
        grid[row][col] = player.mark;
    }

    // get number of open slots
    const getOpenSlots = () => {
        return slots;
    }

    const resetBoard = () => {
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                grid[row][col] = '';
            }
        }
        // reset the number of open slots
        slots = 9;
    };

    const checkStatus = (row, col, player) => {
        if(row === 0){
            if(col === 0){
                if(grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2] ||
                    grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col] ||
                    grid[0][0] == grid[1][1] && grid[1][1] === grid[2][2]){
                        return true;
                }  
            }
            else if(col === 1){
                if(grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col] || 
                    grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2])
                    return true;
            }
            else if(col === 2){
                if(grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col] ||
                    grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] || 
                    grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2])
                        return true;
            }
        } else if(row === 1){
            if(col === 0){
                if(grid[0][0] === grid[1][0] && grid[1][0] == grid[2][0] ||
                    grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2])
                    return true;
            }
            else if(col === 1){
                if(grid[0][0] == grid[1][1] && grid[1][1] === grid[2][2] || 
                    grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] || 
                    grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] || 
                    grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2])
                    return true;
            } 
            else if(col === 2){
                if(grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2] || 
                    grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2])
                    return true;
            }
        } else if(row === 2){
            if(col === 0){
                if(grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col] || 
                    grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] || 
                    grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]){
                        return true;
                    }
            }
            else if(col === 1){
                if(grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] ||
                    grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2])
                    return true;
            }
            else if(col === 2){
                if(grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2] || 
                    grid[0][0] == grid[1][1] && grid[1][1] === grid[2][2] ||
                    grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2])
                    return true;
            }
        }
        return false;
    }

    const gameOver = (player, winner) => {
        if(winner) {
            console.log(`${player.mark} has won the game!`);

        } else {
            console.log("A tie. No one won!");
        }
    }

    return {initializeBoard, insertMark, checkStatus, gameOver, getOpenSlots, resetBoard};

})();


// display module.
// all things to update front end display go here
const displayController = (() => {

    // initial function to load the game board in HTML
    const loadBoard = () => {
        const grid = document.querySelector(".grid")
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                const box = document.createElement("button");
                box.classList.add("box");
                box.setAttribute('data-row', `${row}`);
                box.setAttribute('data-col', `${col}`);
                box.setAttribute('style', `height: 100px; width: 100px;`);
                box.addEventListener('click', function(event) {
                    gameState.advanceGame(event);
                });
                grid.appendChild(box);
            }
        }
    };

    const resetBoard = () => {
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            box.textContent = ""
            box.disabled = false;
        });

        // if game result has been displayed, remove that too.
        const result = document.querySelector("div.result");
        if(result){
            const resultParent = result.parentElement;
            resultParent.removeChild(result);
        }

    }

    // function to fill a box
    const insertMark = (row, col, player) => {
        const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        box.textContent = player.mark;
    };

    const gameOver = (player, winner) => {
        const boxes = document.querySelectorAll("button.box");
        boxes.forEach(box => {box.disabled = true});

        const boardBody = document.querySelector("div.board");
        const result = document.createElement("div");
        result.classList.add("result")

        if(winner && player.mark === 'x'){
            result.textContent = "Player 1 has won the game!";
        } else if(winner && player.mark === 'o'){
            result.textContent = "Player 2 has won the game!";
        } else {
            result.textContent = "It's a tie!";
        }
        boardBody.appendChild(result);
    }

    const putResetButton = () => {
        const boardBody = document.querySelector("div.board");
        const resetButton = document.createElement("button");
        resetButton.classList.add('reset');
        resetButton.textContent = "New Game";
        resetButton.style.margin = "20px 0";
        resetButton.addEventListener('click', function() {
            // reset the internal gameboard
            gameBoard.resetBoard();
            // reset the display board
            resetBoard();
        });
        boardBody.appendChild(resetButton);

    }

    return {loadBoard, insertMark, gameOver, putResetButton};
})();


// this module will dictate the flow of the game
const gameState = (() => {

    let players = [Player(0), Player(1)];

    // initialize the internal game board
    gameBoard.initializeBoard();

    // initialize the display board
    displayController.loadBoard();
    displayController.putResetButton();

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

        // disable this box so you can't click on it again
        event.target.disabled = true;

        // check the status of the game. true if someone has won
        const gameStatus = gameBoard.checkStatus(row, col, players[getTurn()]);
    
        // this player has won the game, or game is over
        if(gameStatus || gameBoard.getOpenSlots() === 0){
            gameBoard.gameOver(players[getTurn()], gameStatus);
            displayController.gameOver(players[getTurn()], gameStatus);
            return;
        }

        changeTurn();
    }

    return {advanceGame};

})();

