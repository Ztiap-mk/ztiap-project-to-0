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
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,this.s,this.v);
        ctx.fillStyle = "black";
        ctx.fillText(this.text,this.x+20,this.y+45);
        ctx.restore();
    }
}