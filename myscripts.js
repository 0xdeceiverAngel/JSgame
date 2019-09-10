var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player_x=canvas.width/2-150;
var player_y=canvas.height/2;
var gen_rate=1000;
var enemy_arrary=[];
var upPressed = false;
var downPressed = false;
var pos=canvas.width;
var score=0;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeY = e.clientY ;
    if(relativeY > 0 && relativeY < canvas.height-20) {
       player_y=relativeY;
    }
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
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#aaa";
    ctx.fillText("Score: "+score, 8, 20);
}
function remove_enemy()
{
  
  for(var i=0;i<enemy_arrary.length;i++)
    {
      
      if(!enemy_arrary[i].x)
        {
          enemy_arrary.splice(i, 1);
        }
     
    }
}
function count_score()
{
for(var i=0;i<enemy_arrary.length;i++)
    {  if(enemy_arrary[i].x+20<player_x&&enemy_arrary[i].saw!=1)
    {
      score+=1;
      enemy_arrary[i].saw=1;
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
function check_gameover()
{
  for(var i=0;i<enemy_arrary.length;i++)
    {  
      if(enemy_arrary[i].y<=player_y&&player_y<=enemy_arrary[i].y+20&&enemy_arrary[i].x<=player_x&&player_x<=enemy_arrary[i].x+20){
//         console.log("down");
        alert("GAME OVER");
    document.location.reload();
   
      }
      
    if(player_y<=enemy_arrary[i].y&&enemy_arrary[i].y<=player_y+20&&
      player_x<=enemy_arrary[i].x&&enemy_arrary[i].x<=player_x+20
      ){
//         console.log("down");
    alert("GAME OVER");
    document.location.reload();
    
      }  
      
    }
}
function gen_enemy()
{
//   await sleep(800);
    var enemy_y=Math.floor(Math.random()*(canvas.height-20));
    var enemy_x=canvas.width-1;
    var obj={x:enemy_x,y:enemy_y};
    enemy_arrary.push(obj);
}
function gen_rate_speedup()
{
  if(score==5&&gen_rate!=500)
    {
      gen_rate=500;
      clearInterval(interval);
      interval=setInterval(gen_enemy, gen_rate);
        
    }
  if(score==10&&gen_rate!=200)
    {
      gen_rate=200;
      clearInterval(interval);
      interval=setInterval(gen_enemy, gen_rate);
    }
  if(score==100&&gen_rate!=100)
    {
      gen_rate=100;
    clearInterval(interval);
      interval=setInterval(gen_enemy, gen_rate);

        
    }
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
  draw_enemy();
  modify_enemy_x_pos();
  remove_enemy();
  count_score();
  drawScore();
  check_gameover();
  gen_rate_speedup();

  

}

setInterval(draw, 10);
var interval=setInterval(gen_enemy, gen_rate);