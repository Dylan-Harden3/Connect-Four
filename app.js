/*
    Here, we get every div in the board and add the onclick event to add to the board
*/
document.addEventListener('DOMContentLoaded', () => {

    const cells = document.querySelectorAll('.board div');

    for(let i = 0 ; i < cells.length ; i++){

        cells[i].onclick = () => {
            
            //if the cell directly bellow it is not occupied then you cannot go there

            if(cells[i+7].classList.contains('occupied') && !isoccupied(cells[i])){

                setCell(cells[i]);
                checkWin(localStorage.getItem("turn"),cells);
                switchTurn();
                switchHover();

            }else {

                alert("You cannot go there");
            }

        }

    }

});

//set the color of the cell that was selected

function setCell(cell){

    if(localStorage.getItem("turn") === "red"){

        removeHover(cell);
        cell.classList += " red occupied";

    }else {

        removeHover(cell);
        cell.classList += " yellow occupied";

    }

}

//switch the turn and update the label to display

function switchTurn() {

    if(localStorage.getItem("turn") === "red"){

        localStorage.setItem("turn","yellow");

    }else {

        localStorage.setItem("turn","red");

    }

    var turnLabel = document.getElementById("player-turn");
    turnLabel.innerHTML = localStorage.getItem("turn") + " its your turn!";
}

//switch the hover color when one person goes

function switchHover() {

    let redHover = document.getElementsByClassName('red-hover');
    let yellowHover = document.getElementsByClassName('yellow-hover');

    var turnisRed = localStorage.getItem("turn") === "red";

    if(redHover.length == 0){

        if(turnisRed){

            while(yellowHover.length){

                yellowHover[0].classList.add('red-hover');
                yellowHover[0].classList.remove('yellow-hover');

            }

        }

    }else {

        if(!turnisRed) {

            while(redHover.length){

                redHover[0].classList.add('yellow-hover');
                redHover[0].classList.remove('red-hover');
            }

        }

    }
}

//check if a cell is occupied

function isoccupied(cell){

    if(cell.classList.contains("occupied")){
        return true;
    }

    return false;
}

//reset the hover for a cell once it is occupied

function removeHover(cell){

    if(cell.classList.contains('red-hover')) {
        cell.classList.remove('red-hover');
    }

    if(cell.classList.contains('yellow-hover')) {
        cell.classList.remove('yellow-hover');
    }
}

window.onload = () => {

    var turn = localStorage.getItem("turn");

    if(!turn){
        localStorage.setItem("turn","red");
    }
}

/*
    To check if a player has won, we expand in every direction until we either reach a cell that is occupied by the other color,
    the end of the board, or until we reach a count of 4 cells with the color. The directions are down-left (0), down (1), down-right(2),
    right(3), up-right(4), up(5), up-left(6) and left(7).
*/

function checkWin(color,cells) {

    for(var i = 0 ; i < cells.length - 7; i++){

        if(cells[i].classList.contains(color)){

            if(hasCellinDirection(cells,i,0)){

                if(cells[i+6].classList.contains(color)){
                    checkDirection(cells,i+6,color,0,2);
                }

            }
            if(hasCellinDirection(cells,i,1)){

                if(cells[i+7].classList.contains(color)){
                    checkDirection(cells,i+7,color,1,2);
                }

            }     
            if(hasCellinDirection(cells,i,2)){

                if(cells[i+8].classList.contains(color)){
                    checkDirection(cells,i+8,color,2,2);
                }

            }
            if(hasCellinDirection(cells,i,3)){

                if(cells[i+1].classList.contains(color)){
                    checkDirection(cells,i+1,color,3,2);
                }

            }
            if(hasCellinDirection(cells,i,4)){

                if(cells[i-6].classList.contains(color)){
                    checkDirection(cells,i-6,color,4,2);
                }

            }
            if(hasCellinDirection(cells,i,5)){

                if(cells[i-7].classList.contains(color)){
                    checkDirection(cells,i-7,color,5,2);
                }

            }
            if(hasCellinDirection(cells,i,6)){

                if(cells[i-8].classList.contains(color)){
                    checkDirection(cells,i-8,color,6,2);
                }

            }
            if(hasCellinDirection(cells,i,7)){

                if(cells[i-1].classList.contains(color)){
                    checkDirection(cells,i-1,color,7,2);
                }

            }
        }
    }
}

function checkDirection(cells,position,color,direction,length){

    if(!hasCellinDirection(cells,position,direction)){
        return;
    }

    if(direction == 0){

        if(cells[position + 6].classList.contains(color)){

            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position + 6,color,direction,length+1);
            }
        }

    }else if(direction == 1){

        if(cells[position + 7].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position + 7,color,direction,length+1);
            }
        }

    }else if(direction == 2){

        if(cells[position + 8].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position + 8,color,direction,length+1);
            }
        }

    }else if(direction == 3){

        if(cells[position + 1].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position + 1,color,direction,length+1);
            }
        }

    }else if(direction == 4){

        if(cells[position - 6].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position - 6,color,direction,length+1);
            }
        }

    }else if(direction == 5){

        if(cells[position - 7].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position - 7,color,direction,length+1);
            }
        }

    }else if(direction == 6){

        if(cells[position - 8].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position - 8,color,direction,length+1);
            }
        }

    }else if(direction == 7){

        if(cells[position - 1].classList.contains(color)){
            if(length+1 == 4){
                endGame(color,direction);
            }else {
                checkDirection(cells,position - 1,color,direction,length+1);
            }
        }

    }
}

function endGame(color,direction){
    
    alert(`${color} has Won! by ${getDirection(direction)}`);
    
    var cells = document.querySelectorAll('.board div');

    for(var i = 0 ; i < cells.length - 7 ; i ++){
        cells[i].classList = "cell red-hover";
    }
}

//check that the next cell in the direction is on the board 

function hasCellinDirection(cells,position,direction) {

    if(direction == 0){

        return !(position % 7 == 0 || (position >= 35 && position <=41));

    }else if(direction == 1){

        return !(position >= 35 && position <=41);

    }else if(direction == 2){

        return !((position + 1) % 7 == 0 || (position >= 35 && position <=41));

    }else if(direction == 3){

        return !((position + 1) % 7 == 0);

    }else if(direction == 4){

        return !((position + 1) % 7 == 0 || (position >=0 && position <= 6));

    }else if(direction == 5){

        return !(position >=0 && position <= 6);

    }else if(direction == 6){

        return !(position % 7 == 0 || (position >=0 && position <= 6));

    }else if(direction == 7){

        return !(position % 7 == 0);
        
    }
}

//display the direction by which the player won (mainly for debugging)

function getDirection(direction){
    if(direction === 0){
        return ("left to right diagonal");
    }else if(direction === 1){
        return ("vertical");
    }else if(direction === 2){
        return ("right to left diagonal");
    }else if(direction === 3){
        return ("horizontal");
    }else if(direction === 4){
        return ("left to right diagonal");
    }else if(direction === 5){
        return ("vertical");
    }else if(direction === 6){
        return ("right to left diagonal");
    }else if(direction === 7){
        return ("horizontal");
    }
}