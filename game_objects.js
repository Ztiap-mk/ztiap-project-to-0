class Sliepka {
    constructor(){
        this.smer =Math.random() < 0.5 ? 1 : -1;
        this.typ = Math.floor(Math.random()*3);
        this.dx = 3;
        this.animation_cell = 0; //toto je na animovanie
        if (this.smer==1){ //ak P-L
            this.x = canvas.width;
        } else{
            this.x = 0; //ak ide L-P
        }
        this.y = Math.floor(Math.random()*(canvas.height/2+100));
        this.image = resourceManager.getImageSource("sprite");
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
        this.sizew = 100*this.velkost;
        this.sizeh = (this.image.height)*this.velkost;
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
      ctx.drawImage(this.image,0+100*this.animation_cell,0,100,90,0,0,this.sizew,this.sizeh);
      //kreslim image, v tom obrazku seknem obrazok od pozicie 0+100*animation cell, vyska od 0, sekam po 100px a 90px na vysku,
      //rozmery obrazka ktory idem vykreslit su this.sizew a this.sizeh
      ctx.restore();
    }
    new_frame(){
        if (this.animation_cell+1>6) this.animation_cell=0;
        else this.animation_cell++;
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
        if(Hrac.naboje>=0){ //lebo pri poslednom naboji odcitam najprv cize =0 a to uz by nebral do uvahy
            var trafil = false;
            if (this.smer==1){
                if(x>this.x && x<this.x+(this.sizew*this.smer) && y>this.y && y<this.y+this.sizeh) //sliepka je v podstate stvorec, len sa zmensuje, zvacsuje
                    trafil = true;
            }
            else {//ked je opacne otocena sliepka, opacne ako obrazok tak this.x nie je lavy horny roh ale pravy lebo to tak vykreslujem
                if(x<this.x && x>this.x+this.sizew*this.smer && y>this.y && y<this.y+this.sizeh)
                   trafil=true;
            }
            if (trafil){
                if (zvuk_active){
                    smrt_sliepky.pause();
                    smrt_sliepky.currentTime=0;
                    smrt_sliepky.play();
                }
                Hrac.skore+=skore;
                //delete sliepky[sliepky.indexOf(this)];
                sliepky.splice(sliepky.indexOf(this),1);
                var max = sliepky.length>7?0:1;
                for (var i=0;i<Math.floor(Math.random()*max+max);i++) {sliepky.push(new Sliepka())};
            }
        }
    }
    kontrola(){
       if (timer<60) this.dx = 5;
       console.log("dlzka",sliepky.length);
       console.log(sliepky);
       if (this.x > canvas.width || this.x<0){  //ak sliepka prejde cez hraciu plochu vymazem ju a generujem nove
            //delete sliepky[sliepky.indexOf(this)];
            sliepky.splice(sliepky.indexOf(this),1);
            var max = sliepky.length>7?0:1; //aby som tam nemal tych sliepok strasne vela...
            for (var i=0;i<Math.floor(Math.random()*max+max);i++) {sliepky.push(new Sliepka())};
        }
    } 
}
