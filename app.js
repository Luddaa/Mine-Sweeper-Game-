var Minesweeper;
(function (Minesweeper) {
    var board = [];
    var rows = 8;
    var columns = 8;
    var minesCount = 4;
    var minesLocation = [];
    var tilesClicked = 0;
    var flagEnabled = false;
    var gameOver = false;
    window.onload = function () {
        startGame();
    };
    function setMines() {
        var minesLeft = minesCount;
        while (minesLeft > 0) {
            var r = Math.floor(Math.random() * rows);
            var c = Math.floor(Math.random() * columns);
            var id = r.toString() + "-" + c.toString();
            if (!minesLocation.includes(id)) {
                minesLocation.push(id);
                minesLeft -= 1;
            }
        }
    }
    function startGame() {
        document.getElementById("mines-count").innerText = minesCount.toString();
        document.getElementById("flag-button").addEventListener("click", setFlag);
        setMines();
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var a = 0; a < columns; a++) {
                var tile = document.createElement("div");
                tile.id = i.toString() + "-" + a.toString();
                tile.addEventListener("click", clickTile);
                document.getElementById("board").append(tile);
                row.push(tile);
            }
            board.push(row);
        }
        console.log(board);
    }
    function setFlag() {
        if (flagEnabled) {
            flagEnabled = false;
            document.getElementById("flag-button").style.backgroundColor = "lightgray";
        }
        else {
            flagEnabled = true;
            document.getElementById("flag-button").style.backgroundColor = "darkgray";
        }
    }
    function clickTile() {
        if (gameOver || this.classList.contains("tile-clicked")) {
            return;
        }
        var tile = this;
        if (flagEnabled) {
            if (tile.innerText == "") {
                tile.innerText = "🚩";
            }
            else if (tile.innerText == "🚩") {
                tile.innerText = "";
            }
            return;
        }
        if (minesLocation.includes(tile.id)) {
            document.getElementById("mines-count").innerText = "Boom!! Try Again";
            gameOver = true;
            revealMines();
            return;
        }
        var coords = tile.id.split("-");
        var r = parseInt(coords[0]);
        var c = parseInt(coords[1]);
        checkMine(r, c);
    }
    function revealMines() {
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                var tile = board[r][c];
                if (minesLocation.includes(tile.id)) {
                    tile.innerText = "💣";
                    tile.style.backgroundColor = "red";
                }
            }
        }
    }
    function checkMine(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= columns) {
            return;
        }
        if (board[r][c].classList.contains("tile-clicked")) {
            return;
        }
        board[r][c].classList.add("tile-clicked");
        tilesClicked += 1;
        var minesFound = 0;
        minesFound += checkTile(r - 1, c - 1);
        minesFound += checkTile(r - 1, c);
        minesFound += checkTile(r - 1, c + 1);
        minesFound += checkTile(r, c - 1);
        minesFound += checkTile(r, c + 1);
        minesFound += checkTile(r + 1, c - 1);
        minesFound += checkTile(r + 1, c);
        minesFound += checkTile(r + 1, c + 1);
        if (minesFound > 0) {
            board[r][c].innerText = minesFound.toString();
            board[r][c].classList.add("x" + minesFound.toString());
        }
        else {
            checkMine(r - 1, c - 1);
            checkMine(r - 1, c);
            checkMine(r - 1, c + 1);
            checkMine(r, c - 1);
            checkMine(r, c + 1);
            checkMine(r + 1, c - 1);
            checkMine(r + 1, c);
            checkMine(r + 1, c + 1);
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
})(Minesweeper || (Minesweeper = {}));
