//var resourceManager = new ResourceManager();
var pozadie=new Image();
//nastavenie canvasu
pozadie.src = "img/pozadie.png";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 600;
var keys = {}; //ake klavesy sme stlacili
var sliepky = []; //tu budu vsetky sliepky v hre
var active = false;
//buttony v menu 
var play_button = {
    x:canvas.width/2 -50,
    y: canvas.height/2-100,
    visible:true,
    klik(px,py){
        console.log(px,py,this.x,this.y);
        if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
            console.log("YES klikol som na again");
            active = true;
            this.visible=false;
            instructions_button
            Hrac.pozx = 10; //lebo v move sa mi to potom hodilo na ukonci hru :), kedze nastavim active na true a hrac je mimo plochy stale
            Hrac.pozy = 10;
            console.log("play button active :)",active);
            canvas.onclick = Hrac.strel;
            window.onkeydown = function(event) {
                keys[event.keyCode] = true;
            };
            window.onkeyup = function(event) {
                keys[event.keyCode] = false;
            };
            canvas.onmousedown = mousedown;
            canvas.onmouseup = mouseup;
            canvas.onmousemove = mousemove;
            console.log("Idem volat main loop");
            mainloop_game();
        }
    }
}
var instructions_button = {
    x:canvas.width/2 -50,
    y: canvas.height/2+10,
    visible:true,
    klik(px,py){
        if(px>this.x && px<this.x+100 && py>this.y && py<this.y+100){ //ak som klikol na play_button
            alert("Aim with mouse, reload with spacebar. You have 90 seconds to shoot as many chickens as you can.");
        }
    }
}
    //SLIEPKA
class Sliepka {
    constructor(){
        this.smer =Math.random() < 0.5 ? 1 : -1;
        this.typ = Math.floor(Math.random()*3);
        this.dx = 3;
        this.size = 100;
        if (this.smer==1){ //ak ide z lava doprava
            this.x = 200;
        } else{
            this.x = canvas.width-100; //ak ide z prava dolava
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
      ctx.save();
      //console.log(this.size,this.x,this.y); 
      ctx.drawImage(this.image,this.x,this.y,100,100);
      ctx.restore();
    }
    onclick(){
        
        Hrac.skore+=20;
    }
    kontrola(){
        if (this.x > canvas.width || this.x<0){
            this.smer *=-1;
            this.pom *=-1;
        }
    }
    urci_poziciu(x,y){ //toto je v sliepke
        console.log("urcujem poziciu");
        this.x = x;
        this.y = y;
    }
    
}
for(var x=0;x<6;x++){
    sliepky.push(new Sliepka());
}
function klik_hra(event){
    Hrac.strel(event);
}
function move(){
    Hrac.move();
}
//zobrazenie hry, view
function display(){
    ctx.drawImage(pozadie, 0, 0, pozadie.width,    pozadie.height,0, 0, canvas.width, canvas.height);
    this.ctx.fillText("Moorhuhn",10,10);
    ctx.fillStyle = "#fc1703";
    for (i=0; i<Hrac.naboje;i++){
        var x = 650;
        var y = 550;
        ctx.fillRect(x+i*30,y,20,20);
    }
    Hrac.draw();
    for (i in sliepky){
        sliepka = sliepky[i];
        //sliepka.move(); idem ju posuvat mysou :))
        sliepka.draw();
    }
}
//loop ktora bude bezat pocas hry
function mainloop_game(){
    console.log("Mainloop");
    move();
    console.log("globalna premenna active",active);
    if (active){
    console.log("Po move");
    display();
    console.log("Po display");
    requestAnimationFrame(mainloop_game);
    }

}
//mys
var mouse = { x: 0, y: 0, pressed: false, selected: false};
//klikanie a pohyb mysou
function mousedown(event){
    console.log("Mouse down");
    mouse.pressed = true;
    for (i in sliepky){
        var sliepka = sliepky[i];
        if (mouse.x>sliepka.x && mouse.x<sliepka.x+100 && mouse.y>sliepka.y && mouse.y<sliepka.y+100 && mouse.pressed==true){
            console.log("MAM SLIEPKU");
            mouse.selected = sliepka; //poslem do mouse selected cely objekt sliepky
            break;
        }
    }
}
function mousemove(event){
    mouse.x = event.pageX - canvas.offsetLeft
    mouse.y = event.pageY - canvas.offsetTop
    
    if (mouse.pressed) {
        mouse.selected.urci_poziciu(mouse.x,mouse.y);
        console.log("Hybem sa",mouse.x,mouse.y);
    }
}
function mouseup(event){
    mouse.down = false;
    mouse.selected = false;
}
function button_kontrola(event){
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    if(instructions_button.visible) instructions_button.klik(x,y);
    if (play_button.visible) play_button.klik(x,y);
}
function nacitaj_menu(){
    ctx.font = "30px Arial";
    ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
    canvas.onclick = button_kontrola;
    
    if (play_button.visible){
        ctx.fillStyle = "red";
        ctx.fillRect(play_button.x,play_button.y,150,100);
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText('Play game',play_button.x+25,play_button.y+45); 
    }
    if(instructions_button.visible){
        ctx.fillStyle = "red";
        ctx.fillRect(instructions_button.x,instructions_button.y,100,100);
        ctx.fillStyle = "black";
        ctx.fillText('Instructions',instructions_button.x+25,instructions_button.y+45);
    }
   
    
}
window.onload = function(){
    nacitaj_menu();
}
function ukonci_hru(){ //funkcia na ukoncenie hry
    play_button.visible = true;
    cancelAnimationFrame(mainloop_game);
    console.log("funkcia ukonci hru");
    active = false;
    ctx.fillStyle = "white"; //biela
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "red";
    canvas.onmousedown = null;
    canvas.onmouseup = null;        
    canvas.onmousemove = null;
    ctx.font = "30px Arial";
    ctx.fillText('Game over',canvas.width/2-70,canvas.height/2-200);
    ctx.fillText("prosim",0,0);
    ctx.fillRect(play_button.x,play_button.y,150,100);
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText('Again',play_button.x+25,play_button.y+45); 
    canvas.onclick = button_kontrola;
}

//objekt hrac tu nebude treba ani draw ani move.... ale na cviko 6mam
var Hrac={
    skore : 0,
    time : 120,
    naboje: 10,
    pozy:20,
    pozx:100,
    strel: function (event){
        console.log("BAM");
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        for (i in sliepky){
            var sliepka = sliepky[i];
            if (x>sliepka.x && x<(sliepka.x+sliepka.image.width*sliepka.velkost) && y>sliepka.y && y<(sliepka.y+sliepka.image.height*sliepka.velkost)){
                sliepka.onclick();
            }
        }
        this.naboje--;  
    },
    draw: function(){
        ctx.fillRect(this.pozx,this.pozy,25,25);
    },
    move: function(){ //podla toho co stlacam sa hybem...
        if (keys[37]) this.pozx -= 5; // sipka vlavo
        if (keys[39]) this.pozx += 5; // sipka vpravo
        if (keys[38]) this.pozy -= 5; // sipka hore
        if (keys[40]) this.pozy += 5; // sipka dole
        if (active && (this.pozx>canvas.width || this.pozx <0 || this.pozy<0 || this.pozy>canvas.height)){
            console.log("preslo wtf");
            console.log("active v move",active);
            ukonci_hru();
        }
    }
}