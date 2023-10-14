let board;
let boardwidth = 800;
let boardheight = 600;
let context;

//player
let playerwidth = 80;
let playerheight = 10;
let playervelocityX = 10;

//Breaker
let ballwidth = 10;
let ballheight = 10;
let ballvelocityX = 3;
let ballvelocityY = 2;

let ball = {
    x:boardwidth/2,
    y:boardheight/2,
    height : ballheight,
    width : ballwidth,
    velocityX : ballvelocityX,
    velocityY : ballvelocityY
}

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
    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    //Breaker
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ballvelocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce
    if(ball.y <= 0){
        // if ball touches top
        ball.velocityY *= -1;
    }
    else if(ball.x <= 0 || (ball.x + ball.width) >= boardwidth){
        // if ball touches of left or right 
        ball.velocityX *= -1;
    }
    else if((ball.y + ball.height) >= boardheight){
        //game over
    }
}
function outofbound(xPosition){
    return(xPosition <0 || xPosition + playerwidth > boardwidth);
}
function movePlayer(e){
    if(e.code == "ArrowLeft"){
        //player.x -= player.velocityX;
        let nextplayerX = player.x - player.velocityX;
        if(!outofbound(nextplayerX)){
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight"){
       // player.x += player.velocityX;
       let nextplayerX = player.x + player.velocityX;
        if(!outofbound(nextplayerX)){
            player.x = nextplayerX;
        }
    }
}
function detectcollision(a,b){
    return a.x < b.x +b.width && 
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}
function topCollision(ball,block){ //a is ball
    return detectcollision(ball,block) && (ball.y + ball.height) >= block.y;
}
function bottemCollision(ball,block){
    return detectcollision(ball,block) && (block.y + block.height) >= ball.y;
}
function leftCollision(ball,block){
    return detectcollision(ball,block) && (ball.x + ball.width) >= block.x;
}
function righttCollision(ball,block){
    return detectcollision(ball,block) && (block.x + block.width) >= ball.x;
}