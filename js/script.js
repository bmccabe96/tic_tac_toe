'use strict';

//Factory function for players
const player = (playerName, playerMarking) => {
    const name = playerName;
    const marking = playerMarking;
    const getPlayerName = () => name;
    const getPlayerMarking = () => marking;

    return {
        getPlayerMarking, getPlayerName
    };
};
//Gameboard controller object
const gameBoard = (function() {
    'use strict';
    let board = ['','','','','','','','',''];
    const createEmptyBoard = () => {
        board = Array(9).join('.').split('.');
        renderBoard(board);
    };
    const getBoard = () => {
        return board;
    };
    const setBoard = (i, marking) => {
        board[i] = marking;
        renderBoard(board);
    };
    const renderBoard = (board) => {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            tile.textContent = board[index];
        });
    }

    return {
        createEmptyBoard, getBoard, setBoard
    };
})();

//Display controller object
const displayController = (() => {

    //Create new game
    const newGame = document.querySelector('.begin-game');
    newGame.addEventListener("click", () => {
        const playerName1 = document.querySelector('#player-1').value;
        const playerMarking1 = document.querySelector('#player-1-marking').value;
        const playerName2 = document.querySelector('#player-2').value;
        const playerMarking2 = document.querySelector('#player-2-marking').value;
        if (!playerName1 || !playerName2 || !playerMarking1 || !playerMarking2) {
            alert("Must populate all fields before beginning");
        }
        else {
            gameController.reset();
            gameController.setPlayers(playerName1, playerMarking1, playerName2, playerMarking2);
            gameBoard.createEmptyBoard();
            clearWinnerMessage();
            clearInputs();
            setCurrentMatchPlayers(playerName1, playerName2);
        }
    });

    const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            tile.addEventListener("click", () => {
                if(tile.textContent === "") {
                    gameController.playRound(index);
                }
            });
        });

    const setCurrentMatchPlayers = (player1, player2) => {
        document.querySelector('.current-player-1').textContent = player1;
        document.querySelector('.current-player-2').textContent = player2;
        document.querySelector('.vs').textContent = "VS";
    }

    const clearInputs = () => {
        document.querySelector('#player-1').value = "";
        document.querySelector('#player-1-marking').value = "";
        document.querySelector('#player-2').value = "";
        document.querySelector('#player-2-marking').value = "";
    }
    
    const clearWinnerMessage = () => {
        const winningMessage = document.querySelector(".winner");
        winningMessage.textContent = "";
    }

    const displayWinner = (winner) => {
        const winningMessage = document.querySelector(".winner");
        winningMessage.textContent = winner;
    };
    
    return {
        displayWinner
    }
})();


//Game controller object
const gameController = (() => {
    let player1 = player();
    let player2 = player();
    const setPlayers = (p1, marking1, p2, marking2) => {
        player1 = player(p1, marking1);
        player2 = player(p2, marking2);
        console.log(player1, player2);
    };
    let round = 1;
    let isOver = false;

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? player1.getPlayerMarking() : player2.getPlayerMarking();
    };
    const getCurrentPlayerName = () => {
        return round % 2 === 1 ? player1.getPlayerName() : player2.getPlayerName();
    };
    const checkForWinner = () => {
        console.log(gameBoard.getBoard());
        let board = gameBoard.getBoard();
        if (board[0] === board[1] && board[0] === board[2] && board[0] !== "") {winnerFound();}
        else if (board[0] === board[3] && board[0] === board[6] && board[0] !== "") {winnerFound();}
        else if (board[0] === board[4] && board[0] === board[8] && board[0] !== "") {winnerFound();}
        else if (board[1] === board[4] && board[1] === board[7] && board[1] !== "") {winnerFound();}
        else if (board[2] === board[5] && board[2] === board[8] && board[2] !== "") {winnerFound();}
        else if (board[2] === board[4] && board[2] === board[6] && board[2] !== "") {winnerFound();}
        else if (board[3] === board[4] && board[3] === board[5] && board[3] !== "") {winnerFound();}
        else if (board[6] === board[7] && board[6] === board[8] && board[6] !== "") {winnerFound();}
        if (!board.includes("")){tie();}
    }

    const tie = () => {
        displayController.displayWinner("TIE GAME");
        document.querySelector('#player-1').focus();
    }

    const winnerFound = () => {
        const winner = getCurrentPlayerName();
        console.log(winner);
        displayController.displayWinner(`${winner} wins!!`);
        document.querySelector('#player-1').focus();
    };

    const playRound = (i) => {
        gameBoard.setBoard(i, getCurrentPlayerSign());
        checkForWinner();
        round++;
    }

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return {
        setPlayers, playRound, reset
    }
})();





