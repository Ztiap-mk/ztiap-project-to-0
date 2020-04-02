
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
    ctx.fillStyle = "red";
    ctx.fillRect(play_button.x,play_button.y,100,100);
    ctx.fillRect(instructions_button.x,instructions_button.y,100,100);
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText('Play game',play_button.x+20,play_button.y+45); 
    ctx.fillText('Instructions',instructions_button.x+20,instructions_button.y+45);
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
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText('Game over',canvas.width/2-70,canvas.height/2-200);
    ctx.fillRect(play_button.x,play_button.y,150,100);
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText('Again',play_button.x+25,play_button.y+45); 
    canvas.onclick = button_kontrola;
}