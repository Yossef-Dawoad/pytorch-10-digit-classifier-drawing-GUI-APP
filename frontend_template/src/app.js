import Arraygrid from "./arraygrid.js"

let canvas = document.getElementById("canvas-screen");





let garr =new Arraygrid([28,28])
garr.draw_on(canvas,"#fff");
garr.mouseInputHandler();// asynic



var label = document.getElementById('lbl');
var predbtn = document.getElementById('predictbtn');
var clearbtn = document.getElementById('clearbtn');
let theme_toggle = document.getElementById('theme_toggle');
let apptitle = document.getElementById('app_title');

theme_toggle.addEventListener('click',function(){
    
    document.body.style.background = '#111';
    garr.draw_on(canvas,"#000");
    apptitle.style.color = "#fff"
})







clearbtn.addEventListener('click',function(){
    garr.fillWith(0);
    garr.clearall(canvas);
    // console.log(garr)
    label.innerHTML='none';
})


predbtn.addEventListener('click',function(){
    // console.log(garr)
    eel.make_prediction(garr.array)(function(ret_val){
        // console.log(ret_val)
        label.innerHTML= ret_val[1]
        label.style.color = '#0f0'
    })
})



