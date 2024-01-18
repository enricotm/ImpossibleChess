const mainDiv = document.getElementById("main")
for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement("div")
    rowDiv.classList.add("rowDiv")
    for (let col = 0; col < 8; col++) {
        const coinDiv = document.createElement("div");
        coinDiv.classList.add("coinDiv");

        const coin = document.createElement("div")
        coin.id = "coin"+(row*8+col)
        coin.classList.add("coin");
        coin.setAttribute("onclick", "ChangeColor("+coin.id+")")

        coinDiv.appendChild(coin)
        rowDiv.appendChild(coinDiv);
    }
    mainDiv.appendChild(rowDiv)
}
RandomizeColors()

function RandomizeColors() {
    for (let i = 0; i < 64; i++) {
        const coin = document.getElementById("coin"+i)
        coin.classList.remove("red", "blue")
        coin.classList.add(["red", "blue"][Math.floor(Math.random()*2)])
    }
}

function ChangeColor(coin) {
    if (coin.classList.value.includes("red")) {
        coin.classList.remove("red")
        coin.classList.add("blue")
    } else {
        coin.classList.remove("blue")
        coin.classList.add("red")
    }
}