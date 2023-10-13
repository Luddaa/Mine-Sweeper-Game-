namespace Minesweeper {
    let board: HTMLElement[][] = [];
    let rows: number = 8;
    let columns: number = 8;
    let minesCount: number = 4;
    let minesLocation: string[] = [];
    let tilesClicked: number = 0;
    let flagEnabled: boolean = false;
    let gameOver: boolean = false;

    window.onload = function() {
        startGame();
    };

    function setMines() {
        let minesLeft: number = minesCount;
        while (minesLeft > 0) {
            let r: number = Math.floor(Math.random() * rows);
            let c: number = Math.floor(Math.random() * columns);
            let id: string = r.toString() + "-" + c.toString();

            if (!minesLocation.includes(id)) {
                minesLocation.push(id);
                minesLeft -= 1;
            }
        }
    }

    function startGame() {
        document.getElementById("mines-count")!.innerText = minesCount.toString();
        document.getElementById("flag-button")!.addEventListener("click", setFlag);
        setMines();

        for (let i = 0; i < rows; i++) {
            let row: HTMLElement[] = [];
            for (let a = 0; a < columns; a++) {
                let tile: HTMLElement = document.createElement("div");
                tile.id = i.toString() + "-" + a.toString();
                tile.addEventListener("click", clickTile);
                document.getElementById("board")!.append(tile);
                row.push(tile);
            }
            board.push(row);
        }
        console.log(board);
    }

    function setFlag() {
        if (flagEnabled) {
            flagEnabled = false;
            document.getElementById("flag-button")!.style.backgroundColor = "lightgray";
        } else {
            flagEnabled = true;
            document.getElementById("flag-button")!.style.backgroundColor = "darkgray";
        }
    }

    function clickTile(this: HTMLElement) {
        if (gameOver || this.classList.contains("tile-clicked")) {
            return;
        }

        let tile: HTMLElement = this;
        if (flagEnabled) {
            if (tile.innerText == "") {
                tile.innerText = "🚩";
            } else if (tile.innerText == "🚩") {
                tile.innerText = "";
            }
            return;
        }

        if (minesLocation.includes(tile.id)) {
            document.getElementById("mines-count")!.innerText = "Boom!! Try Again";
            gameOver = true;
            revealMines();
            return;
        }

        let coords: string[] = tile.id.split("-");
        let r: number = parseInt(coords[0]);
        let c: number = parseInt(coords[1]);
        checkMine(r, c);
    }

    function revealMines() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile: HTMLElement = board[r][c];
                if (minesLocation.includes(tile.id)) {
                    tile.innerText = "💣";
                    tile.style.backgroundColor = "red";
                }
            }
        }
    }

    function checkMine(r: number, c: number) {
        if (r < 0 || r >= rows || c < 0 || c >= columns) {
            return;
        }
        if (board[r][c].classList.contains("tile-clicked")) {
            return;
        }

        board[r][c].classList.add("tile-clicked");
        tilesClicked += 1;

        let minesFound: number = 0;

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
        } else {
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
            document.getElementById("mines-count")!.innerText = "Cleared You Win";
            gameOver = true;
        }
    }

    function checkTile(r: number, c: number): number {
        if (r < 0 || r >= rows || c < 0 || c >= columns) {
            return 0;
        }
        if (minesLocation.includes(r.toString() + "-" + c.toString())) {
            return 1;
        }
        return 0;
    }
}
