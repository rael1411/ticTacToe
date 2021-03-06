const gameBoard = (() => {
    let gameGrid = [];
    for (let i = 0; i < 9; i++){
        gameGrid[i] = "empty";
    }
    return gameGrid;
})();
const player = (name, symbol) => {
    return{
        name,
        symbol
    }
}
var player1 = player("player1", "cross");
var player2 = player("player2", "circle");
var turn = player1.name;

const container = document.querySelector("#container");
const winner = document.querySelector("#winner");
const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", (e)=> {
    e.preventDefault();
    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;
    if (turn === player1.name){
        turn = name1;
    }
    else if (turn === player2.name){
        turn = name2;
    }
    player1.name = name1;
    player2.name = name2;
});

//creates the gameboard based on the gameBoard function
const render = function(){
    container.innerHTML = "";
    turn = player1.name;
    gameBoard.forEach((cell, index) => {
        let element = document.createElement("div");
        if (cell === "empty"){
            element.textContent = "";
        }
        element.id = index;
        element.className = "cell";
        
        element.addEventListener("mouseover", function(e){
            if (gameBoard[element.id] === "empty" && gameState() === ""){
                if (turn === player1.name)
                {
                    if (player1.symbol === "cross")
                    {
                        element.innerHTML = "X";
                        element.classList.add("crossHover");
                        element.classList.remove("circleHover");
                    }
                    else
                    {
                        element.innerHTML = "O";
                        element.classList.add("circleHover");
                        element.classList.remove("crossHover");
                    }
                }
                else {
                    if (player2.symbol === "circle")
                    {
                        element.innerHTML = "O";
                        element.classList.add("circleHover");
                        element.classList.remove("crossHover");

                    }
                    else
                    {
                        element.innerHTML = "X";
                        element.classList.add("crossHover");
                        element.classList.remove("circleHover");
                    }
                }
            }
        });
        element.addEventListener("click", function(e){
            //cleaning the board of hover elements if the game is over
            if (gameBoard[element.id] === "empty" && gameState() === ""){
                if (turn === player1.name)
                {
                    if (player1.symbol === "cross")
                    {
                        element.innerHTML = "X";
                        gameBoard[element.id] = "cross";
                        turn = player2.name;
                        element.classList.add("cross");
                        element.classList.remove("crossHover");
                        element.classList.remove("circleHover");
                    }
                    else
                    {
                        element.innerHTML = "O";
                        gameBoard[element.id] = "circle";
                        turn = player2.name;
                        element.classList.add("circle");
                        element.classList.remove("crossHover");
                        element.classList.remove("circleHover");
                    }
                } else {
                    if (player2.symbol === "circle")
                    {
                        element.innerHTML = "O";
                        gameBoard[element.id] = "circle";
                        turn = player1.name;
                        element.classList.add("circle");
                        element.classList.remove("crossHover");
                        element.classList.remove("circleHover");
                    }
                    else
                    {
                        element.innerHTML = "X";
                        gameBoard[element.id] = "cross";
                        turn = player1.name;
                        element.classList.add("cross");
                        element.classList.remove("crossHover");
                        element.classList.remove("circleHover");
                    }
                }
                if (gameState() != ""){
                    let champion = document.createElement("p");
                    champion.textContent = `The winner is: ${gameState()}!` ;
                    winner.appendChild(champion);
                }
            }
        });
        element.addEventListener("mouseout", function(){
            element.classList.remove("circleHover");
            element.classList.remove("crossHover");
        })

    container.appendChild(element);
    });
    //creates and programs a button to restart the game
    let restart = document.createElement("button");
    restart.textContent = "RESTART";
    restart.id = "restart";
    restart.addEventListener("click", ()=> {
        for (let i = 0; i < 9; i++){
            gameBoard[i] = "empty";
        }
        winner.innerHTML = "";
        render();
    });
    container.appendChild(restart);
}
//this function checks if there is a winner, and if there is it returns their name
const gameState =(() => {
    let winningCombos=[[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];
    let winner = "";
    winningCombos.forEach((combo) => {
        let won = true;        
        let temp = gameBoard[combo[0]];
        if (gameBoard[combo[0]] != "empty" && gameBoard[combo[1]] != "empty" && gameBoard[combo[2]] != "empty"){
            combo.forEach((position) => {
                if (gameBoard[position] != temp){
                    won = false; 
                };
            })
            if (won === true){
                if (temp == player1.symbol){
                    winner = player1.name;
                } else if (temp == player2.symbol)
                {
                    winner = player2.name;
                }
            }
        }
    });
    //check for ties
    let tie = true;
    for (let i = 0; i < 8; i++){
        if (gameBoard[i] === "empty"){
            tie = false;
        }
        
    }
    if (tie && winner == ""){
        winner = "Tie";
    }
    return winner;
})
render();