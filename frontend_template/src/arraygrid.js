export default class Arraygrid{
    constructor(dimensions){
        this.dimensions = dimensions // dimensions of the array
        this.fillNumber = 0
        this.inversefillNumber = 1;   
        this.array  = this.fillWith(this.fillNumber) // fill the array
        
    }

    fillWith(fillNumber) {
        let array = [...Array(this.dimensions[0])].map(_ => Array(this.dimensions[1]).fill(fillNumber));
        return array 
    }

    set_on(cordinate,fillColor){
        if(!(this.posX > this.array.length ||this.posY > this.array.length ||this.posX < 0||this.posY < 0)){
            this.array[cordinate[0]][cordinate[1]] = fillColor;
            // return this.array
            }

    }
    draw(){
        this.array.forEach((row, i) => {
            row.forEach((ele, j) =>{
                if(ele === 0){
                    // console.log(this.bgColor)
                    this.ctx.fillStyle = this.bgColor;  
                    this.ctx.fillRect(j*this.grid_bloc_width,i*this.grid_bloc_height,this.grid_bloc_width,this.grid_bloc_height);  
                }
                else{
                    // console.log(this.inverse_bgColor)
                    this.ctx.fillStyle = this.inverse_bgColor;
                    this.ctx.fillRect(j*this.grid_bloc_width,i*this.grid_bloc_height,this.grid_bloc_width,this.grid_bloc_height);
                }
            });
        });
        console.log(this.array)

      
    }
    clearall(){
        
        this.array = this.fillWith(this.fillNumber);
        this.ctx.fillStyle = this.bgColor;  
        this.ctx.fillRect(0,0,this.canvas_width,this.canvas_height);  
        
    }
    draw_on(canvas, color='#000'){

        this.bgColor = color;
        this.inverse_bgColor = (color=='#000') ? '#fff': '#000';
        this.canvas = canvas;
        this.canvas_width = canvas.clientWidth;
        this.canvas_height = canvas.clientHeight;
        this.ctx = canvas.getContext("2d");
        this.bloc_width  = this.canvas_width/this.array.length;
        this.bloc_height  = this.canvas_height/this.array.length;
        this.grid_bloc_width  = this.canvas.width/this.array.length;
        this.grid_bloc_height  = this.canvas.height/this.array.length;
        this.ctx.fillStyle = this.bgColor; 
        this.ctx.fillRect(0,0,this.canvas_width,this.canvas_height);  

        // console.log('this function ran thank to you')
    }
    mouseInputHandler(){

        let mouse_isDown = false;
        this.canvas.addEventListener('mousedown', _ => {
            mouse_isDown = true;
        });
        
        this.canvas.addEventListener('mousemove', e => {
            if (mouse_isDown === true) {
            this.posX = Math.floor(e.offsetX /this.bloc_width); //get x_positon of the mouse related to canvas
            this.posY = Math.floor(e.offsetY / this.bloc_height);
            this.ctx.clearRect(0,0,this.canvas_width,this.canvas_height);

            var pensize = document.getElementById('s').checked ? 1 : 2;

            var big_brush = document.getElementById('deleterb');
            var smallbrush = document.getElementById('deleters');
            var brushSize = smallbrush.checked ? 1 : 2;

            
            if (big_brush.checked ||smallbrush.checked){
                this.set_on([this.posY,this.posX],this.inversefillNumber)
                if(brushSize == 2){
                    this.set_on([this.posY+1,this.posX],this.inversefillNumber)
                    this.set_on([this.posY,this.posX+1],this.inversefillNumber)
                    this.set_on([this.posY+1,this.posX+1],this.inversefillNumber)
                }
            }
            else{
                this.set_on([this.posY,this.posX],this.fillNumber)
                if(pensize == 2){
                    this.set_on([this.posY+1,this.posX],this.fillNumber)
                    this.set_on([this.posY,this.posX+1],this.fillNumber)
                    this.set_on([this.posY+1,this.posX+1],this.fillNumber)
                }
            }

            this.draw()

            }
        });
        window.addEventListener("mouseup",_ =>{if(mouse_isDown===true){mouse_isDown=false}})

    }

   
}