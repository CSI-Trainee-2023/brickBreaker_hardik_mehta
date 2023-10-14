let board;
let boardwidth = 800;
let boardheight = 600;
let context;

//player
let playerwidth = 80;
let playerheight = 10;
let playervelocityX = 10;


let player = {
    x:boardwidth/2 -playerwidth/2,
    y:boardheight-playerheight-5,
    width : playerwidth,
    height: playerheight,
    velocityX : playervelocityX
}

window.onload = function(){
    board=document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown",movePlayer);

}
function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);

    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);
}
function movePlayer(e){
    if(e.code == "ArrowLeft"){
        player.x -= player.velocityX;
    }
    else if (e.code == "ArrowRight"){
        player.x += player.velocityX;
    }
}
