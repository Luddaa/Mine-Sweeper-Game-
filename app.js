let board = [];
let rows = 8;
let columns = 8;
let mineCount = 5;
let minesLocation = [];
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;

window.onload = function(){
    startGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = mineCount;


    //fill board up
    for (let i = 0; i < rows; i++) {
        let row = [];
         for (let a = 0; a < columns; a++) {
            let tile = document.createElement("div");
            tile.id=i.toString() + "-" + a.toString();
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
