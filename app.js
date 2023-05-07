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
    document.getElementById("flag-button").addEventListener("click", setFlag);

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

    let tile = this;
    if (flagEnabled){
        if(tile.innerText == ""){
            tile.innerText= "🚩";
        }
        else if (tile.innerText =="🚩"){
            tile.innerText= "";
        }
    }
}

