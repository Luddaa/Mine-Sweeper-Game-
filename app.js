let board = [];
let rows = 8;
let columns = 8;
let minesCount = 5;
let minesLocation = []; 
let tilesClicked = 0; 
let flagEnabled = false;
let gameOver = false;
//Guided me through https://www.youtube.com/watch?v=AfhfAxKFP-s&list=LL&index=18
//help me understand the process
window.onload = function() {
    startGame();
}

function setMines(){
   // minesLocation.push("2-2");

//took code to randomized mines from https://github.com/ImKennyYip/Minesweeper/blob/master/minesweeper.js
    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
        minesLocation.push(id);
        minesLeft -= 1;
        }
    }
}



function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //fill board up
    for (let i = 0; i < rows; i++) {
        let row = [];
         for (let a = 0; a < columns; a++) {
            let tile = document.createElement("div");
            tile.id=i.toString() + "-" + a.toString();
            tile.addEventListener("click",clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
//setting flag up

function setFlag(){
    if (flagEnabled){
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else{
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function clickTile(){

    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }


    let tile = this;
    if (flagEnabled){
        if(tile.innerText == ""){
            tile.innerText= "🚩";
        }
        else if (tile.innerText =="🚩"){
            tile.innerText= "";
        }
        return;
    }

    if(minesLocation.includes(tile.id)){
        document.getElementById("mines-count").innerText = "Boom!! Try Again";
        //alert("Game Over");
        gameOver = true;
        revealMines();
        return;
    }
    
    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}
// shows mines when hit
function revealMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}
//mine check
function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    //top 3
    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    //left and right
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        //top 3
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        //bottom 3
        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared You Win";
        gameOver = true;
    }

}
function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
 
//made understnanding some concepts easier:
https://www.youtube.com/watch?v=kBMnD_aElCQ&list=LL&index=7
https://www.youtube.com/watch?v=rxdGAKRndz8&list=LL&index=15