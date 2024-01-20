const mainDiv = document.getElementById("main");
for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("rowDiv");
    for (let col = 0; col < 8; col++) {
        const coinDiv = document.createElement("div");
        coinDiv.classList.add("coinDiv");

        const coin = document.createElement("div");
        coin.id = "coin"+(row*8+col);
        coin.classList.add("coin");
        coin.setAttribute("onclick", "ChangeCoin("+coin.id+")");

        coinDiv.appendChild(coin);
        rowDiv.appendChild(coinDiv);
    }
    mainDiv.appendChild(rowDiv);
}
let setKey = false;
let keyId = 0;
let playerMode = 2;
Randomize();

function Randomize() {
    for (let i = 0; i < 64; i++) {
        const coin = document.getElementById("coin"+i);
        coin.classList.remove("red", "blue");
        coin.classList.add(["red", "blue"][Math.floor(Math.random()*2)]);
    }
    ChangeKey();
}

function ChangeCoin(coin) {
    if (setKey) {
        ChangeKey(parseInt(coin.id.replace("coin", "")));
        SetKey();
    } else {
        ChangeColor(coin);
    }
}

function ChangeColor(coin) {
    if (coin.classList.value.includes("red")) {
        coin.classList.remove("red");
        coin.classList.add("blue");
    } else {
        coin.classList.remove("blue");
        coin.classList.add("red");
    }
}

function ChangeKey(coinId="") {
    document.getElementById("coin"+keyId).parentElement.classList.remove("key");
    keyId = coinId != "" ? coinId : Math.floor(Math.random()*64);
    if (playerMode != 1) { document.getElementById("coin"+keyId).parentElement.classList.add("key") }
}

function SetKey() {
    const setKeyBtn = document.getElementById("keyBtn");
    if (setKey) {
        setKeyBtn.classList.remove("key");
        setKey = false;
    } else {
        setKeyBtn.classList.add("key");
        setKey = true;
    }
}

function ChangePlayerMode() {
    playerMode = (playerMode % 2) + 1;
    const playerModeBtn = document.getElementById("playerMode");
    const keyDiv = document.getElementById("coin"+keyId).parentElement;
    const setKeyBtn = document.getElementById("keyBtn");
    if (playerMode == 1) {
        playerModeBtn.textContent = "1 Player";
        keyDiv.classList.remove("key");
        setKeyBtn.hidden = true;
    } else {
        playerModeBtn.textContent = playerMode+" Players";
        keyDiv.classList.add("key");
        setKeyBtn.hidden = false;
    }
}