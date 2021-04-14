import Arraygrid from "./arr_uptaded.js"

let canvas = document.getElementById("canvas-screen");





let garr =new Arraygrid([10,10])
garr.draw_on(canvas,"#fff");
garr.mouseInputHandler();// asynic



var label = document.getElementById('lbl');
var predbtn = document.getElementById('predictbtn');
var clear = document.getElementById('clearbtn');

clear.addEventListener('click',function(){
    garr.fillWith(0);
    garr.clearall(canvas);
    console.log(garr)
    label.innerHTML='none';
})


predbtn.addEventListener('click',function(){
    // console.log(garr)
    eel.make_prediction(garr.array)(function(ret_val){
        console.log(ret_val)
        label.innerHTML= ret_val[1];
        label.style.color = '#0f0'
    })
})



