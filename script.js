var totalTileCount = 6;
var mode = "hard";
var answerCell;
var r, g, b;
//generate a random RGB color number
function randomColorGenerate() {

    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    return [r, g, b];
}
//update the number in the heading
function updateRGBHeader(r, g, b) {
    document.getElementById("rgbToGuess").textContent = "RGB(" + r + ", " + g + ", " + b + ")";
}
//functionality of new color button
document.getElementById("newGame").addEventListener("click", function () {
    location.reload();
})
//functionality of mode change to easy
document.getElementById("easy").addEventListener("click", function () {
    //disable the lower 3 cells
    document.getElementById("displayHardMode").classList.add("displayEasyMode");
    mode = "easy";
    generateQuiz(mode);
    totalTileCount = 3;
})
//functionality to change mode to hard
document.getElementById("hard").addEventListener("click", function () {
    //enable the lower 3 cells
    document.getElementById("displayHardMode").classList.remove("displayEasyMode");
    mode = "hard";
    generateQuiz("mode");
    totalTileCount = 6;
})
//function to generate a quiz
function generateQuiz(mode) {
    document.getElementById("result").textContent = "";
    document.querySelector(".header").style.backgroundColor = "";
    var rgbForAnswerCell = randomColorGenerate();

    r = rgbForAnswerCell[0];
    g = rgbForAnswerCell[1];
    b = rgbForAnswerCell[2];
    //update the rgb on header
    updateRGBHeader(r, g, b);
    if (mode == 'easy') {
        //generate a number between 1 and 3
        answerCell = Math.floor(Math.random() * 3) + 1;
        document.getElementById(answerCell).style.backgroundColor = "RGB(" + r + ", " + g + ", " + b + ")";
        fillOtherTiles(answerCell);
    } else {
        //generate a number 1 and 6
        answerCell = Math.floor(Math.random() * 6) + 1;
        document.getElementById(answerCell).style.backgroundColor = "RGB(" + r + ", " + g + ", " + b + ")";
        fillOtherTiles(answerCell);
    }
}

//function to fill every other tile with random color
function fillOtherTiles(answerCell) {
    for (var i = 1; i <= totalTileCount; i++) {
        if (i == answerCell)
            continue;
        var rgbForAnswerCell = randomColorGenerate();

        r = rgbForAnswerCell[0];
        g = rgbForAnswerCell[1];
        b = rgbForAnswerCell[2];
        document.getElementById(i).style.backgroundColor = "RGB(" + r + ", " + g + ", " + b + ")";
    }
}
//function to check if the clicked cell is correct or wrong
function checkClickedAnswer() {
    if (this.id == answerCell) {
        document.getElementById("result").textContent = "Correct!";
        // document.querySelector(".header").style.backgroundColor = this.style.backgroundColor;
        document.body.style.backgroundColor = this.style.backgroundColor;
        document.querySelector("table").style.display = "none";
        document.getElementById("easy").style.display = "none";
        document.getElementById("hard").style.display = "none";
        document.getElementById("result").style.fontSize = "3rem";
    } else {
        document.getElementById("result").textContent = "Incorrect! Try Again!";
        this.style.backgroundColor = "#1c1c21";
        this.style.border = "none";
    }

}
//calling quiz when page reloads
generateQuiz(mode);
//attach event listener to each cell
for (var i = 1; i <= totalTileCount; i++) {
    document.getElementById(i).addEventListener("click", checkClickedAnswer);
}