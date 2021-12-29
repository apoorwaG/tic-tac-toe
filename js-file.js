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

    // returns true if game is over (someone won), else return false
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

    // function to get the grid. used by aiBot to read the board
    const getBoard = () => {
        return grid;
    }

    return {initializeBoard, getBoard, insertMark, checkStatus, gameOver, getOpenSlots, resetBoard};

})();


// display module.
// all things to update front end display go here
const displayController = (() => {

    const opponents = document.querySelectorAll(".opponents button");
    opponents.forEach(choice => {
        choice.addEventListener('click', function(event) {
            removeStyling(choice);
            event.target.classList.add("scaleUp");
            gameState.setOpponent(event.target.textContent);
        });
    });

    const removeStyling = (choice) => {
        if(choice.classList.contains("scaleUp")){
            choice.classList.remove("scaleUp");
        }
    };

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
                box.disabled = true;
                grid.appendChild(box);
            }
        }
        putResetButton();
    };

    // enable boxes for marking once
    // this is run once opponent has been chosen
    const enableBoard = () => {
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            box.disabled = false;
        });
    }

    // function to reset the display board
    const resetBoard = () => {
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            box.textContent = ""
            // player must choose opponent once again
            box.disabled = true;
        });

        // // remove scaled up opponent selection styling
        const choices = document.querySelectorAll(".opponents button");
        choices.forEach(choice => {
            removeStyling(choice)
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
        resetButton.textContent = "Restart";
        resetButton.style.margin = "20px 0";
        resetButton.addEventListener('click', function() {
            // reset the internal gameboard
            gameBoard.resetBoard();
            // reset the display board
            resetBoard();
            // reset the game state
            gameState.resetState();
        });
        boardBody.appendChild(resetButton);

    }

    return {loadBoard, enableBoard, insertMark, gameOver, resetBoard};
})();

const aiBoard = (board, open) => {
    
    // initialize grid that the bot reads 
    let grid = board;
    let openSlots = open;

    const getBoard = () => {
        return grid;
    }

    const getOpenSlots = () => {
        return openSlots;
    };

    const removeMark = (row, col) => {
        grid[row][col] = "";
        openSlots++;
    }

    const insertMark = (row, col, mark) => {
        grid[row][col] = mark;
        openSlots--;
    };

    const isOpen = (row, col) => {
        if(grid[row][col] === "")
            return true;
        return false;
    }

    const checkWinner = () => {

        let winner = null;
        // check horizontally
        for(let i = 0; i < 3; i++){
            if(grid[i][0] && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]){
                winner = grid[i][0];
                break;
            }
        }
        if(winner) return winner;

        // check vertically
        for(let i = 0; i < 3; i++){
            if(grid[0][i] && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]){
                winner = grid[0][i];
                break;
            }
        }
        if(winner) return winner;

        // check one diagonal
        if(grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]){
            winner = grid[0][0];
        }

        // check other diagonal
        if(grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]){
            winner = grid[0][2];
        } 

        if(winner) return winner;

        if(getOpenSlots() > 0){
            return "null";
        } else {
            return "tie";
        }

    };

    return {getOpenSlots, insertMark, removeMark, getBoard, checkWinner, isOpen}

};

// computer bot that will play with the user
const aiBot = (() => {

    let grid;

    // read internal gameboard, and update it.
    const readBoard = () => {
        grid = aiBoard(gameBoard.getBoard(), gameBoard.getOpenSlots());
    }

    const bestMove = () => {
        let bestScore = -Infinity;
        let move;
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                // is the spot available?
                if(grid.isOpen(row, col)){
                    grid.insertMark(row, col, 'o');
                    let score = minimax(grid, 0, false);
                    grid.removeMark(row, col);
                    if(score > bestScore){
                        bestScore = score;
                        move = [row, col]; 
                    }
                        
                }
            }
        }

        return move;
    }

    let scores = {
        x: -1,
        o: 1,
        tie: 0
    }
    // o is the maximizing player
    // x is the minimizing player
    const minimax = (grid, depth, isMaximizing) => {
        let result = grid.checkWinner();
        if(result !== "null"){
            return scores[result];
        } 

        if(isMaximizing) {
            let bestScore = -Infinity;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){        
                    if (grid.isOpen(i, j)){
                        grid.insertMark(i, j, 'o');
                        let score = minimax(grid, depth+1, false)
                        grid.removeMark(i, j);
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){        
                    if (grid.isOpen(i, j)){
                        grid.insertMark(i, j, 'x');
                        let score = minimax(grid, depth+1, true)
                        grid.removeMark(i, j);
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    const makeMove = () => {
        readBoard();
        let [row, col] = bestMove();
        const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const event = {
            "target": box
        }

        gameState.advanceGame(event);
    };

    return {makeMove};

})();

// this module will dictate the flow of the game
const gameState = (() => {
    let players = [Player(0), Player(1)];
    // player 1 goes first
    let turn = 0;

    let p2;

    // initialize the internal game board
    gameBoard.initializeBoard();

    // initialize the display board and the reset button
    displayController.loadBoard();

    // enable the board once the player has selected an opponent
    const setOpponent = (opponent) => {
        console.log(opponent);
        p2 = opponent;
        // every time an opponent is selected, reset the game state
        // and enable marking in game board
        resetState();
        displayController.enableBoard();
    };

    // reset the game turn, the internal game board and the display board
    const resetState = () => {
        turn = 0;
        gameBoard.resetBoard();
        displayController.resetBoard();
    };

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

        if(p2 === "Computer" && turn === 1){
            aiBot.makeMove();
        }
    }

    return {advanceGame, setOpponent, resetState};

})();

