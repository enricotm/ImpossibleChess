const mainDiv = document.getElementById("main")
for (let row = 0; row < 8; row++) {
    let rowDiv = document.createElement("div")
    rowDiv.classList.add("rowDiv")
    for (let col = 0; col < 8; col++) {
        let coinDiv = document.createElement("div");
        let coin = document.createElement("div")
        coinDiv.classList.add("coinDiv");
        coin.classList.add("coin");
        coin.id = "coin"+(row*8+col)
        coinDiv.appendChild(coin)
        rowDiv.appendChild(coinDiv);
    }
    mainDiv.appendChild(rowDiv)
}
RandomizeColors()

function RandomizeColors() {
    for (let i = 0; i < 64; i++) {
        let coin = document.getElementById("coin"+i)
        coin.classList.remove("red", "blue")
        coin.classList.add(["red", "blue"][Math.floor(Math.random()*2)])
    }
}