class Sliepka {
    constructor(){
        this.smer =Math.random() < 0.5 ? 1 : -1;
        this.typ = Math.floor(Math.random()*3);
        this.dx = 3;
        if (this.smer==1){ //ak P-L
            this.x = canvas.width;
        } else{
            this.x = 0; //ak ide L-P
        }
        this.y = Math.floor(Math.random()*(canvas.height/2+100));
        this.image = resourceManager.getImageSource("sliepka");
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
        this.sizew = (this.image.width-20)*this.velkost;
        this.sizeh = (this.image.height-20)*this.velkost;
    }
    move(){
        if (this.smer==1){
            this.x-=this.dx;
        
        }
        else {
            this.x+=this.dx;
        }
    }
    draw(){
      this.kontrola();
      ctx.save();
      ctx.translate(this.x,this.y);
      
      if (this.smer==1){
        ctx.scale(this.velkost,this.velkost);
        this.pom=-1;
      } 
      else {
        ctx.scale(-1*this.velkost,this.velkost);
        this.pom=-1;
      }
      ctx.drawImage(this.image,0,0,this.sizew,this.sizeh);
      ctx.restore();
    }
    click(x,y){ //
        var skore = 0;
        switch (this.typ){
            case 1:skore=10;
            break;
            case 2: skore=25;
            break;
            default: skore=15;
        }
        if(Hrac.naboje>0){
            if (this.smer==1){
                if(x>this.x && x<this.x+(this.sizew*this.smer) && y>this.y && y<this.y+this.sizeh){ //sliepka je v podstate stvorec, len sa zmensuje, zvacsuje
                    Hrac.skore+=skore;
                    delete sliepky[sliepky.indexOf(this)];
                    for (var i=0;i<Math.floor(Math.random()*2)+1;i++) {sliepky.push(new Sliepka())};
                }
            }
            else {//ked je opacne otocena sliepka, opacne ako obrazok tak this.x nie je lavy horny roh ale pravy lebo to tak vykreslujem
                if(x<this.x && x>this.x+this.sizew*this.smer && y>this.y && y<this.y+this.sizeh){
                    Hrac.skore+=skore;
                    delete sliepky[sliepky.indexOf(this)];
                    for (var i=0;i<Math.floor(Math.random()*2)+1;i++) {sliepky.push(new Sliepka())};
                }
            }
        }
    }
    kontrola(){
       if (this.x > canvas.width || this.x<0){ 
             /*this.smer *=-1; //toto je na odrazanie ale ale radsej vymazem a vygenerujem nove... makes more sense
            this.pom *=-1;*/
            delete sliepky[sliepky.indexOf(this)];
            for (var i=0;i<Math.floor(Math.random()*2);i++) {sliepky.push(new Sliepka())};
        }
    } 
}
