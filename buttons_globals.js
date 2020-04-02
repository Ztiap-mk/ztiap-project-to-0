var pozadie = new Image();
pozadie.src = "img/pozadie.png";
var obrazok_sliepky = new Image();
obrazok_sliepky.src="img/sliepka1l.png";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
var timer = 120;
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
class Button{
    constructor(x,y){
        this.x = x;
        this.y=y;
        this.visible=true;
    }
    klik(x,y){}
}
var instructions_button = new Button(canvas.width/2 -50,canvas.height/2+10);
instructions_button.klik = function(px,py){
    if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
        alert("Aim with mouse, reload with spacebar. You have 90 seconds to shoot as many chickens as you can.");
    }
}
var play_button = new Button(canvas.width/2 -50,canvas.height/2-100);
play_button.klik = function(px,py){
    console.log(px,py,this.x,this.y);
        if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
            console.log("YES klikol som na again");
            active = true;
            this.visible = false;
            instructions_button.visible = false;
            Hrac.pozx = 10; //lebo v move sa mi to potom hodilo na ukonci hru :), kedze nastavim active na true a hrac je mimo plochy stale
            Hrac.pozy = 10;
            canvas.onclick = MouseClick;
            console.log("Idem volat main loop");
            setInterval(() => {
                timer--;
                console.log(timer);
            }, 1000);
            mainloop_game();
        }
}


