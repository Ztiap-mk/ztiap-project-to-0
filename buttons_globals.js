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
    naboje: 10,
}
class Button{
    constructor(text,x,y,s,v){
        this.text = text;
        this.x = x;
        this.y=y;
        this.visible=true;
        this.s = s;
        this.v = v;
    }
    draw(){
        ctx.save();
        ctx.font = "12px Arial";
        console.log("Kreslim button",this.x,this.y,this.s, this.v);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,this.s,this.v);
        ctx.fillStyle = "black";
        ctx.fillText(this.text,this.x+20,this.y+45);
        ctx.restore();
    }
}
var instructions_button = new Button("Instructions",canvas.width/2 -50,canvas.height/2+10,100,100);
instructions_button.klik = function(px,py){
    if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
        alert("Aim with mouse, reload with spacebar. You have 90 seconds to shoot as many chickens as you can.");
    }
}
var play_button = new Button("Play game",canvas.width/2 -50,canvas.height/2-100,100,100);
play_button.klik = function(px,py){
    console.log(px,py,this.x,this.y);
        if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
            console.log("YES klikol som na again");
            active = true;
            this.visible = false;
            instructions_button.visible = false;
            canvas.onclick = MouseClick;
            timer=120;
            for(var x=0;x<Math.floor(Math.random()*10+2);x++){
                sliepky.push(new Sliepka());
            }
            console.log("Idem volat main loop");
            setInterval(() => {
                timer--;
                console.log(timer);
            }, 1000);
            mainloop_game();
        }
}
