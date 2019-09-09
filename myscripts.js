var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player_x=canvas.width/2-150;
var player_y=canvas.height/2;

var enemy_arrary=[];
var upPressed = false;
var downPressed = false;
var pos=canvas.width;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
//         console.log(upPressed);
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
//       console.log(downPressed);
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
//        console.log(upPressed);
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
//       console.log(downPressed);
    }
}
function draw_player()
{
    ctx.beginPath();
    ctx.rect(player_x, player_y, 20, 20);
    ctx.fillStyle = "#009f";
    ctx.fill();
    ctx.closePath();
    if(downPressed)
    {
        player_y += 7;
        if (player_y + 20 > canvas.height){
            player_y = canvas.height-20;
        }
    }
    else if(upPressed) {
        player_y -= 7;
        if (player_y < 0){
            player_y = 0;
        }
 }
}
function modify_enemy_x_pos()
{
  for(var i=0;i<enemy_arrary.length;i++)
    { 
      (enemy_arrary[i].x)-=5;

    }
}
async function gen_enemy()
{
//   await sleep(800);
    var enemy_y=Math.floor(Math.random()*canvas.height);
    var enemy_x=canvas.width-1;
    var obj={x:enemy_x,y:enemy_y};
    enemy_arrary.push(obj);
}
function draw_enemy()
    {
    
    for(var i=0;i<enemy_arrary.length;i++)
    {
      
      ctx.beginPath();
//       ctx.arc(enemy_arrary[i].x, enemy_arrary[i].y, 0, Math.PI*2);
      ctx.rect(enemy_arrary[i].x-20, enemy_arrary[i].y, 20, 20);
//       ctx.rect(150, 150, 20, 20);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
     
    }
      
      
    
    }
function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_player();
//   gen_enemy()
  draw_enemy();
  modify_enemy_x_pos();
//   console.log(enemy_arrary[0]);
  

}

setInterval(draw, 10);
setInterval(gen_enemy, 1000);