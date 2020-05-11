class App{
    constructor(){
        //this.canvas = document.getElementById("canvas");
        //this.ctx = this.canvas.getContext("2d");
        console.log("Konstruktor");
    }
    async start(){
        console.log("Start");
        await resourceManager.init();
        pozadie = resourceManager.getImageSource("pozadie");
        state =  new Menu(); //na zaciatku menu
        //this.objects = state.objects; //tu budu vzdy objekty danej sceny
        canvas.onclick = this.onclick;
        this.main_loop();
    }
    onclick(event){ //kontrola ci som klikol na nejaky objekt v scene
        if (zvuk_active) {
            if (Hrac.naboje>0){
                strelba.pause();
                strelba.currentTime=0;
                strelba.play();
            }
            else {
                empty.pause();
                empty.currentTime = 0;
                empty.play();
            }
        }
        var x = event.pageX - canvas.offsetLeft; //zistim kde som realne klikol
        var y = event.pageY - canvas.offsetTop;
        console.log(state.objects);
        Hrac.naboje--; //odpocitam naboj
        for(var i in state.objects){
            var object = state.objects[i];
            object.click(x,y); //spustim pre kazdy objekt funkciu klik kde si uz sam objekt kontroluje ci sme nanho klikli
        }
    }
    draw(){
        state.draw(); //nech sa vykresli cela scena v state je napr menu alebo Main_game
    }
    update(){
        state.update(); //cely state sa updatne, toto iba pri main_game v inych states je to prazdna funkcia nic sa nestane
        //this.objects = state.objects;
    }
    main_loop(){
        this.update();
        this.draw();
        requestAnimationFrame(() => this.main_loop())
    }
}
window.onload = function(){
    if (this.zvuk_active) priroda.play();
    var app = new App();
    app.start();
}