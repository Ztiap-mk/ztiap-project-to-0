
//loop ktora bude bezat pocas hry
function mainloop_game(){
    if(timer<=0) ukonci_hru();
    move(); 
    if (active){
    display();
    requestAnimationFrame(mainloop_game);
    }
}
function move(){
    for (i in sliepky){
        sliepka = sliepky[i];
        sliepka.move();
    }
}
function MouseClick(event){
    Hrac.naboje--;
    for (i in sliepky){
        var sliepka = sliepky[i];
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        sliepka.click(x,y);
    }
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
        //sliepka.move();
        sliepka.draw();
    }
}
//kontrola ci som stlacil nejaky z 2 buttonov
function button_kontrola(event){
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    if (instructions_button.visible) instructions_button.klik(x,y);
    if (play_button.visible) play_button.klik(x,y);
}
function nacitaj_menu(){
    ctx.font = "30px Arial";
    ctx.fillText('Moorhuhn',canvas.width/2-70,canvas.height/2-200);
    canvas.onclick = button_kontrola;
    play_button.draw();
    instructions_button.draw();
}
window.onload = function(){
    nacitaj_menu();
}
function ukonci_hru(){ //funkcia na ukoncenie hry
    cancelAnimationFrame(mainloop_game);
    console.log("funkcia ukonci hru");
    active = false;
    play_button.visible = true;
    instructions_button.visible=false;
    ctx.fillStyle = "white"; //biela
    ctx.clearRect(0,0,canvas.width,canvas.height);
    play_button.text = "Play Again";
    play_button.draw();
    ctx.font = "30px Arial";
    sliepky = [];
    console.log("TU")
    console.log(canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillText("Game over",canvas.width/2-70,canvas.height/2-250);
    ctx.fillText("Score: "+Hrac.skore,canvas.width/2-70,canvas.height/2-200); 
    Hrac.skore = 0;
    canvas.onclick = button_kontrola;
}