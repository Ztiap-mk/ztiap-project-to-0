class Base_screen{
    constructor(){
        this.objects = [];
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
    if(px>this.x && px<this.x+this.s && py>this.y && py<this.y+this.v){
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
        this.instructions_button = new Button("Instructions",canvas.width/2 -50,canvas.height/2+10,100,100);
            this.instructions_button.click = function(px,py){
            if(px>this.x && px<this.x+this.s && py>this.y && py<this.y+this.v){ //ak som klikol na play_button
                state = new Instructions();
            }
        }
        this.play_button = new Button("Play game",canvas.width/2 -50,canvas.height/2-100,100,100);
         this.play_button.click = function(px,py){
            if(px>this.x && px<this.x+this.s && py>this.y && py<this.y+this.v){ //ak som klikol na play_button
                window.onkeypress = function(event){ //prebijanie
                    if (event.keyCode==32)
                        Hrac.naboje=10;
                        if(zvuk_active){
                            prebijanie.play();
                        }
                    if(event.key=="x"){ //skoncenie hry skor
                        state = new Game_over();
                    }
                    }
                timer=90;
                Hrac.naboje=10;
                state = new Main_game();
                casovac_f = setInterval(() => {
                    timer--;                    
                }, 1000);
                animacia_sliepok_casovac = setInterval(function(){ //volam funkcie pre kazdu sliepku aby posunula svoj
                    //animation cell
                    for (var y in sliepky){
                        var s = sliepky[y];
                        s.new_frame();
                    }
                },200)
                }
            }
        this.objects.push(this.play_button);
        this.objects.push(zvuk);
        this.objects.push(this.instructions_button);
    }
    draw(){ //
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
        for (var i in this.objects){
            this.objects[i].draw();
        }
        
    }
}
class Main_game extends Base_screen{
    constructor(){
        super();
        for(let i=0;i<5;i++) sliepky.push(new Sliepka());
        this.objects = sliepky.slice(); //prekopirujem sliepky aj do objects
        this.zvuk = zvuk; //nemazat potom to pada ale neviem preco
        this.objects.push(this.zvuk);
    }
    draw(){ //KRESLENIE VSETKYCH OBJEKTOV V SCENE 
        ctx.drawImage(pozadie, 0, 0, pozadie.width,    pozadie.height,0, 0, canvas.width, canvas.height); //pozadie
        //texty, skore a timer
        ctx.fontStyle = "15px Arial";
        ctx.fillText("Moorhuhn",10,25);
        ctx.fillText("Score "+Hrac.skore,canvas.width/2-150,25);
        ctx.fillText("Time: "+timer,canvas.width/2+100,25);
        ctx.fillStyle = "#fc1703";
        // -----
        //vykreslovanie nabojov hraca
        for (var i=0; i<Hrac.naboje;i++){ 
        var x = 650;
        var y = 550;
        ctx.fillRect(x+i*30,y,20,20);
        }
        //pre kazdy objekt v scene (pole objects zavolam draw a move (ak je to sliepka))
        for (var i in this.objects){
        var object = this.objects[i];
            if (typeof(object.move)=="function") //osetrenie aby som nevolal na zvuk funkciu move... potom by to padlo
                object.move();
            object.draw();
        }
        this.zvuk.draw();
    }
    update(){ //UPDATE SCENY (ci som nahodou neskoncil hru a tiez update kolko mam momentalne sliepok na hracej ploche)
        this.objects=sliepky.slice(); //lebo inac to nekopriovalo ten array ale iba v podstate ukazovalo na tu array
        this.objects.push(this.zvuk);
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
        this.game_over_button = new Button("Play again",canvas.width/2 -50,canvas.height/2-100,100,100);
        this.game_over_button.click = function(px,py){
            if(px>this.x && px<this.x+this.s && py>this.y && py<this.y+this.v){ //ak som klikol na play_button
                state = new Main_game();
                timer=90;
                Hrac.skore=0;
                casovac_f = setInterval(() => {
                    timer--;
                }, 1000);
                }
        }
        this.objects.push(this.game_over_button);
        this.objects.push(zvuk);
    }
    draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
        ctx.fillText("Score "+Hrac.skore,canvas.width/2-70,canvas.height/2-120);
        for (var i in this.objects)
            this.objects[i].draw();
    }
}
class Instructions extends Base_screen{
    constructor(){
        super();
        this.menu = new Button("Back",canvas.width/2 -50,canvas.height/2-100,100,100);
        this.menu.click = function(px,py){
            if(px>this.x && px<this.x+this.s && py>this.y && py<this.y+this.v) //ak som klikol na play_button
                state = new Menu();
        }
        this.objects.push(this.menu);
    }
    draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
        this.menu.draw();
        ctx.font = "15px Console";
        ctx.fillText("Aim and shoot with mouse, reload with spacebar. Exit with X.",canvas.width/2-200,canvas.height/2+20);
        ctx.fillText("You have 90 seconds to shoot as many chickens as you can.",canvas.width/2-200,canvas.height/2+100);
    }
}