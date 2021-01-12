export default class Arrgrid{
    constructor(dimensions){
        this.dimensions = dimensions
        this.setfillNumber = 0
        this.array  = this.fillWith(0)
    }
    fillWith(fillNumber) {
        let array = [...Array(this.dimensions[0])].map(_ => Array(this.dimensions[1]).fill(fillNumber));
        this.array = array;    
    }
    set_on(loc,val){
        //! if array.length < loc => ignore
        if(!(this.posX > this.array.length ||this.posY > this.array.length ||this.posX < 0||this.posY < 0)){

        this.array[loc[0]][loc[1]] = val;
        return this.array
        }

    }
    draw_on(canvas, color='#000'){
        this.setfillNumber = color==="#000" ? 0 : 1;
        this.canvas = canvas;
        this.canvas_width = canvas.clientWidth;
        this.canvas_height = canvas.clientHeight;
        this.ctx = canvas.getContext("2d");
        this.bloc_width  = this.canvas_width/this.array.length;
        this.bloc_height  = this.canvas_height/this.array.length;
        this.grid_bloc_width  = this.canvas.width/this.array.length;
        this.grid_bloc_height  = this.canvas.height/this.array.length;
        this.array.forEach((row, i) => {
            row.forEach((ele, j) =>{
                if(ele === 0){
                    this.ctx.fillStyle ='#fff';  
                    this.ctx.fillRect(j*this.grid_bloc_width,i*this.grid_bloc_height,this.grid_bloc_width,this.grid_bloc_height);  
                }
                else{
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(j*this.grid_bloc_width,i*this.grid_bloc_height,this.grid_bloc_width,this.grid_bloc_height);
                }
            });
        });
    }
    mouseInputHandler(){
        let isDown = false;

        this.canvas.addEventListener('mousedown', _ => {
            // let _ = parseInt(e.offsetX/this.bloc_width);
            // let _ = parseInt(e.offsetY/this.bloc_height);
            isDown = true;
        });
        
        this.canvas.addEventListener('mousemove', e => {
            if (isDown === true) {
            this.posX = Math.floor(e.offsetX /this.bloc_width);
            this.posY = Math.floor(e.offsetY / this.bloc_height);
            this.ctx.clearRect(0,0,this.canvas_width,this.canvas_height);
            console.log([this.posX,this.posY]);
            this.set_on([this.posY,this.posX],this.setfillNumber)
            this.draw_on(this.canvas)





            //code in here
            }
        });
        window.addEventListener("mouseup",_ =>{if(isDown===true){isDown=false}})

    }

   
}