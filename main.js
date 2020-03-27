var pozadie = new Image();
pozadie.src = "img/pozadie.png";
var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 600;



class Sliepka {
    constructor(){
        this.smer =Math.random() < 0.5 ? 1 : -1;
        console.log(this.smer);
        this.typ = Math.floor(Math.random()*3);
        this.dx = 3;
        this.size = 100;
        if (this.smer==1){ //ak ide z lava doprava
            this.x = 0;
        } else{
            this.x = canvas.width; //ak ide z prava dolava
        }
        this.y = Math.floor(Math.random()*(canvas.height/2+100));
        this.image = new Image();
        this.image.src = 'img/sliepka1l.png';
        
        this.pom = 1;
        switch (this.typ){
            case 1:
                this.velkost = 1;
                break;
            case 2:
                this.velkost = 0.5;
                break;
            default:
                this.velkost = 0.75;
        }
        console.log(this.image.width*this.velkost);
    }
    move(){
        if (this.smer==1){
            this.x+=this.dx;
        }
        else this.x-=this.dx;
    }
    draw(){
      this.kontrola();
      ctx.save();
      ctx.translate(this.x,this.y);
      
      if (this.smer==1){
        ctx.scale(-1*this.velkost,this.velkost);
      } 
      else {
        ctx.scale(this.velkost,this.velkost);
      }
      //console.log(this.size,this.x,this.y); 
      ctx.drawImage(this.image,-30,-30,this.size,this.size);
      
      ctx.restore();
    }
    onclick(){
        console.log("BAM");
        Hrac.skore+=20;
    }
    kontrola(){
        if (this.x > canvas.width || this.x<0){
            this.smer *=-1;
            this.pom *=-1;
        }
    }
    
}

var sliepky = [];
for(var x=0;x<6;x++){
    sliepky.push(new Sliepka());
}

var Hrac={
    skore : 0,
    time : 120,
    naboje: 10,
    strel: function (event){
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        for (i in sliepky){
            var sliepka = sliepky[i];
            if (x>sliepka.x && x<(sliepka.x+sliepka.image.width*sliepka.velkost) && y>sliepka.y && y<(sliepka.y+sliepka.image.height*sliepka.velkost)){
                sliepka.onclick();
            }
        }
        this.naboje--;
        
    }
}
function MouseClick(event){
    Hrac.strel(event);
}
function display(){
    ctx.drawImage(pozadie, 0, 0, pozadie.width,    pozadie.height,0, 0, canvas.width, canvas.height);
    this.ctx.fillText("Moorhuhn",10,10);
    ctx.fillStyle = "#fc1703";
    for (i=0; i<Hrac.naboje;i++){
        var x = 650;
        var y = 550;
        ctx.fillRect(x+i*30,y,20,20);
    }
    for (i in sliepky){
        sliepka = sliepky[i];
        sliepka.move();
        sliepka.draw();
    }
}

function mainloop(){
    display();
    requestAnimationFrame(mainloop);

}
window.onload = function(){
    
    canvas.onclick = MouseClick;
    this.requestAnimationFrame(mainloop);
   
}
