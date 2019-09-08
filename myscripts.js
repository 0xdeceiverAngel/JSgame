var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player_x=canvas.width/2-150;
var player_y=canvas.height/2;


var upPressed = false;
var downPressed = false;
var pos=canvas.width;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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
// function draw_enemy()
//     {
      
//     ctx.beginPath();
//     ctx.arc(pos, player_y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
//       pos--;
//     }
function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_player();
//   draw_enemy();
  

}

setInterval(draw, 10);