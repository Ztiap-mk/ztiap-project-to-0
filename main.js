class App{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        console.log("Konstruktor");
    }
    async start(){
        console.log("Start");
        await resourceManager.init();
        console.log("fail1");
        pozadie = resourceManager.getImageSource("pozadie");
        state =  new Menu();
        this.objects = state.objects; //tu budu vzdy objekty danej sceny
        this.canvas.onclick = this.onclick;
        this.main_loop();
    }
    onclick(event){ //kontrola ci som klikol na nejaky objekt v scene
        console.log("Klikol som");
        if (zvuk_active) {
            strelba.pause();
            strelba.currentTime=0;
            strelba.play();
        }
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        console.log(state.objects);
        Hrac.naboje--;
        for(var i in state.objects){
            var object = state.objects[i];
            object.click(x,y);
        }
    }
    draw(){
        state.draw();
    }
    update(){
        state.update();
        this.objects = state.objects;
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