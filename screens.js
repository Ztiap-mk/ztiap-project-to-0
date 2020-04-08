class Base_screen{
    constructor(){
        this.objects = [];
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    update(){}
}
var zvuk = new Button("Sound",canvas.width-50,0,50,50); //toto budem pouzivat vo vsetkych screenoch cize to je globalne
zvuk.draw = function(){ //musim prepisat draw funkciu na tento button lebo potrebujem menit farbu...
    ctx.save();
    ctx.font = "12px Arial";
    if (zvuk_active){
        ctx.fillStyle = "green";
    } else ctx.fillStyle = "red";
    ctx.fillRect(this.x,this.y,this.s,this.v);
     ctx.fillStyle = "black";
    ctx.fillText(this.text,this.x+10,this.y+25);
    ctx.restore();
}
zvuk.click = function(px,py){
    if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){
        if (zvuk_active) {
            zvuk_active=false;
            priroda.pause();
            priroda.currerntTime =0;
        }
        else {
            zvuk_active = true;
            priroda.play();
            priroda.loop=true;
        }
    }
}
class Menu extends Base_screen{
    constructor(){
        super();
        var instructions_button = new Button("Instructions",canvas.width/2 -50,canvas.height/2+10,100,100);
            instructions_button.click = function(px,py){
            if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
            alert("Aim with mouse, reload with spacebar. You have 120 seconds to shoot as many chickens as you can.");
            }
        }
        var play_button = new Button("Play game",canvas.width/2 -50,canvas.height/2-100,100,100);
         play_button.click = function(px,py){
            console.log("Kontrolujem play");
            if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
                console.log("KLikol som na play");
                window.onkeypress = function(event){ //prebijanie
                    if (event.keyCode==32)
                        Hrac.naboje=10;
                        if(zvuk_active){
                            prebijanie.play();
                        }
                    }
                timer=120;
                Hrac.naboje=10;
                state = new Main_game();
                casovac_f = setInterval(() => {
                    timer--;
                    console.log(timer);
                }, 1000);
                }
            }
        this.play_button = play_button;
        this.zvuk = zvuk;
        this.instructions_button = instructions_button;
        this.objects.push(this.play_button);
        this.objects.push(this.zvuk);
        this.objects.push(this.instructions_button);
    }
    draw(){ //
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font = "30px Arial";
        this.ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
        for (var i in this.objects){
            this.objects[i].draw();
        }
        
    }
}
class Main_game extends Base_screen{
    constructor(){
        super();
        for(let i=0;i<5;i++) sliepky.push(new Sliepka());
        this.objects = sliepky;
        this.zvuk = zvuk;
        this.objects.push(this.zvuk);
    }
    draw(){
        this.ctx.drawImage(pozadie, 0, 0, pozadie.width,    pozadie.height,0, 0, canvas.width, canvas.height);
        this.ctx.fontStyle = "15px Arial";
        this.ctx.fillText("Moorhuhn",10,25);
        this.ctx.fillText("Score "+Hrac.skore,canvas.width/2-150,25);
        this.ctx.fillText("Time: "+timer,canvas.width/2+100,25);
        this.ctx.fillStyle = "#fc1703";
        for (var i=0; i<Hrac.naboje;i++){
        var x = 650;
        var y = 550;
        ctx.fillRect(x+i*30,y,20,20);
        }
        for (var i in this.objects){
        var object = this.objects[i];
            if (typeof(object.move)=="function") //osetrenie aby som nevolal na zvuk funkciu move... potom by to padlo
                object.move();
            object.draw();
        }
        this.zvuk.draw();
    }
    update(){
        this.objects=sliepky;
        if (timer<0){
            if (zvuk_active){
                priroda.pause();
                priroda.currentTime=0;
                gong.play();
                priroda.play();
            }
            clearInterval(casovac_f);
            state = new Game_over();
        }
    }
}
class Game_over extends Base_screen{
    constructor(){
        super();
        var game_over_button = new Button("Play again",canvas.width/2 -50,canvas.height/2-100,100,100);
        game_over_button.click = function(px,py){
            if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
                state = new Main_game();
                timer=120;
                casovac_f = setInterval(() => {
                    timer--;
                }, 1000);
                }
        }
        this.game_over_button = game_over_button;
        this.objects.push(this.game_over_button);
        this.zvuk = zvuk;
        this.objects.push(this.zvuk);
    }
    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font = "30px Arial";
        this.ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
        for (var i in this.objects)
            this.objects[i].draw();
    }
}