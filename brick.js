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
let ballvelocityY = 3;

//block
let blockarray = [];
let blockwidth = 50;
let blockheight = 10;
let blockcolums = 13;
let blockRows = 4;
let blockmaxrow = 10;
let blockcount = 0;

let blockX = 15;
let blockY = 45;

let score = 0;
let flag = 0;
let click = 0;
let chanccount = 0;
let gameover = false;

let ball = {
    x:boardwidth/2,
    y: 575,
    height : ballheight,
    width : ballwidth,
    velocityX : 0,
    velocityY : 0
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
    createblocks()

}
function update(){
    ballvelocityX = 3;
    ballvelocityY = 3;
    requestAnimationFrame(update);
    if(gameover){
        return;
    }
    context.clearRect(0,0,board.width,board.height);
    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    //Breaker
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
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

     else if(ball.y + ball.height >= boardheight){
        context.font = "25px sans-serif"
        context.fillText("Game Over:Press 'Space' to restart",200,300)
        context.fillStyle = "styblue";
        gameover = true;

     }
        
    //bounce th ball of player
    if(topCollision(ball,player)||bottemCollision(ball,player)){
        ball.velocityY *= -1;
    }
    else if(leftCollision(ball,player)||rightCollision(ball,player)){
        ball.velocityX *= -1;
    }

    //create blocks
    context.fillStyle = "skyblue";
    for(let i= 0;i<blockarray.length;i++){
        let block = blockarray[i];
        if(!block.break){
            if(topCollision(ball,block)||bottemCollision(ball,block)){
                block.break = true;
                ball.velocityY *= -1;
                blockcount -= 1 ;
                score += 100;
                localStorage.setItem("highscore",score)               
            }
            else if(rightCollision(ball,block)||leftCollision(ball,block)){
                block.break = true;
                ball.velocityX *= -1;
                blockcount -= 1 ;
                score += 100;
                localStorage.setItem("highscore",score)  
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    
    context.font = "20px Arial"
    context.fillText(score, 80, 25) 
    context.fillText("Score :", 10, 25)
}
}
function outofbound(xPosition){
    return(xPosition <0 || xPosition + playerwidth > boardwidth);
}

function movePlayer(e){
    if(e.code == "Enter" && flag == 0){
        resetgame();
        flag = 1 ;
        click = 1;
    }
    if(e.code == "Space" && flag == 1){
        resetgame();
    }
    if(e.code == "ArrowLeft" && click == 1){
        //player.x -= player.velocityX;
        let nextplayerX = player.x - player.velocityX;
        if(!outofbound(nextplayerX)){
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight" && click == 1){
       // player.x += player.velocityX
       let nextplayerX = player.x + player.velocityX;
        if(!outofbound(nextplayerX)){
            player.x = nextplayerX;
        }
    }
} 

function detectcollision(a, b){
    return a.x < b.x + b.width && 
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
function topCollision(ball, block){ 
    return detectcollision(ball, block) && (ball.y + ball.height) >= block.y;
}
function bottemCollision(ball,block){
    return detectcollision(ball, block) && (block.y + block.height) >= ball.y;
}
function leftCollision(ball,block){
    return detectcollision(ball, block) && (ball.x + ball.width) >= block.x;
}
function rightCollision(ball,block){
    return detectcollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createblocks(){
    blockarray = [];
    for (let c = 0;c<blockcolums;c++){
        for(let r = 0;r<blockRows;r++){
        let block = {
            x : blockX + c*blockwidth + c*10,
            y : blockY + r*blockheight + r*10,
            width : blockwidth,
            height : blockheight,
            break : false

        }
        blockarray.push(block);
    }
    }
    blockcount = blockarray.length;
}
function resetgame(){
    gameover = false;
     player = {
        x:boardwidth/2 -playerwidth/2,
        y:boardheight-playerheight-5,
        width : playerwidth,
        height: playerheight,
        velocityX : playervelocityX
    }
    ball = {
        x:boardwidth/2,
        y:575,
        height : ballheight,
        width : ballwidth,
        velocityX : ballvelocityX,
        velocityY : ballvelocityY
    }
    blockarray= [];
    score = 0;
    createblocks();
    
}
