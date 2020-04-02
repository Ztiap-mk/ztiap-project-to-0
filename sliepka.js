class Sliepka {
    constructor(){
        this.smer =Math.random() < 0.5 ? 1 : -1;
        console.log(this.smer);
        this.typ = Math.floor(Math.random()*3);
        this.dx = 3;
        this.size = 100;
        if (this.smer==1){ //ak ide L->P
            this.x = 0;
        } else{
            this.x = canvas.width; //ak ide P->L
        }
        this.y = Math.floor(Math.random()*(canvas.height/2+100));
        this.image = obrazok_sliepky;
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
      ctx.drawImage(this.image,-30,-30,this.size,this.size);
      
      ctx.restore();
    }
    onclick(){
        Hrac.skore+=20;
        delete sliepky[sliepky.indexOf(this)];
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
