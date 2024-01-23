const mainDiv = document.getElementById("main");
for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("rowDiv");
    for (let col = 0; col < 8; col++) {
        const coinDiv = document.createElement("div");
        coinDiv.classList.add("coinDiv");

        const coin = document.createElement("div");
        coin.id = row*8+col;
        coin.classList.add("coin");
        coin.setAttribute("onclick", "ChangeCoin("+coin.id+")");

        coinDiv.appendChild(coin);
        rowDiv.appendChild(coinDiv);
    }
    mainDiv.appendChild(rowDiv);
}
let setKey = false;
let confirmed = false;
let keyId = 0;
let guessId = 0;
let playerMode = 2;
Randomize();

function Randomize() {
    for (let i = 0; i < 64; i++) {
        const coin = document.getElementById(i);
        coin.classList.remove("tails", "heads");
        coin.classList.add(["tails", "heads"][Math.floor(Math.random()*2)]);
    }
    ChangeKey();
}

function ChangeCoin(coinId) {
    if (confirmed) {
        guessId = coinId;
        const guessDiv = document.getElementById(coinId).parentElement;
        const guessTxt = document.getElementById("guessTxt");
        guessTxt.hidden = false;
        if (coinId == keyId) {
            guessDiv.classList.add("correctDiv");
            guessTxt.classList.add("correctTxt");
            guessTxt.textContent = "Correct!";
        } else {
            guessDiv.classList.add("wrongDiv");
            guessTxt.classList.add("wrongTxt");
            guessTxt.textContent = "Wrong!";
            document.getElementById(keyId).parentElement.classList.add("key");
        }
    }
    else if (setKey) {
        ChangeKey(coinId);
        SetKey();
    } else {
        ChangeColor(coinId);
    }
}

function ChangeColor(coinId) {
    const coin = document.getElementById(coinId)
    if (coin.classList.value.includes("tails")) {
        coin.classList.remove("tails");
        coin.classList.add("heads");
    } else {
        coin.classList.remove("heads");
        coin.classList.add("tails");
    }
}

function ChangeKey(coinId="") {
    document.getElementById(keyId).parentElement.classList.remove("key");
    keyId = coinId !== "" ? coinId : Math.floor(Math.random()*64);
    if (playerMode != 1) { document.getElementById(keyId).parentElement.classList.add("key") }
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
    const keyDiv = document.getElementById(keyId).parentElement;
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

function ConfirmBtn() {
    if (confirmed) {
        document.getElementById("configButtons").hidden = false;
        document.getElementById("confirmBtn").textContent = "Confirm";
        confirmed = false;

        if (setKey) { SetKey() };
        document.getElementById(guessId).parentElement.classList.remove("correctDiv", "wrongDiv");
        const guessTxt = document.getElementById("guessTxt");
        guessTxt.classList.remove("correctTxt", "wrongTxt");
        guessTxt.hidden = true;
        Randomize();
    } else {
        document.getElementById("configButtons").hidden = true;
        document.getElementById("confirmBtn").textContent = "Restart";
        confirmed = true;

        document.getElementById(keyId).parentElement.classList.remove("key");
        calcCoinToFlip();
    }
}

function calcCoinToFlip() {
    let flipCoin = 0;
    for (let i = 0; i < 64; i++) {
        const coin = document.getElementById(i);
        if (coin.classList.value.includes("tails")) {
            flipCoin = xor(flipCoin, parseInt(coin.id).toString(2));
        };
    }
    flipCoin = xor(flipCoin, parseInt(keyId).toString(2));
    flipCoinAnimation(flipCoin);
}

function flipCoinAnimation(flipCoin) {
    const flipCoinId = parseInt(flipCoin, 2)
    const flipDiv = document.getElementById(flipCoinId).parentElement;
    ChangeColor(flipCoinId)
    // flipDiv.classList.add("flip");
}

function xor(val1, val2) {
    val1 = String(val1); val2 = String(val2);
    const n = Math.max(val1.length, val2.length);
    val1 = val1.padStart(n,"0"); val2 = val2.padStart(n,"0");
    let res = "";
    for (let i = 0; i < n; i++) {
        if (val1[i] != val2[i]) {
            res += "1"
        } else {
            res += "0"
        };
    }
    return res;
}