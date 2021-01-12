import Arrgrid from "./arr.js"

let canvas = document.getElementById("canvas-screen");
let ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.clientHeight;
const CANVAS_WIDTH = canvas.clientWidth;
ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);





let garr =new Arrgrid([28,28],canvas)
garr.fillWith(1)
garr.set_on([4,4],1)
garr.draw_on(canvas,"#000");
garr.mouseInputHandler();// asynic



var label = document.getElementById('lbl');
var again = document.getElementById('againbtn');
again.addEventListener('click',function(){location.reload()})



