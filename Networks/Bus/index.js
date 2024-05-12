var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.screen.width;
canvas.height = window.screen.height;
document.body.classList.add("remove-scrolling");

function rect(x, y, width, height, r, g, b, a, fill = true){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    if (fill){
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fill();
    }
    else{
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.stroke();
    }
}

function circle(x, y, radius, r, g, b, a, fill = true){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill){
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fill();
    }
    else{
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.stroke();
    }
}

function line(sx, sy, ex, ey, r, g, b, a, thickness){
    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.stroke();
}

function clearScreen(r, g, b){
    rect(0, 0, canvas.width, canvas.height, r, g, b, 1);
}

class Path{
    constructor(sx, ex, y){
        this.sx = sx;
        this.sy = y;
        this.ex = ex;
        this.ey = y;
        this.children = 0;
    }

    addNode(){
        this.children += 1;
    }

    render(){
        this.drawSelf();
        this.drawNodes();
    }

    drawNodes(){
        let distX = Math.abs(this.sx - this.ex);
        let count = 0;

        for (let i = 0; i <= distX; i += distX / this.children){
            if (count % 2 == 0){
                line(i + this.sx, this.sy, i + this.sx, this.sy + 150, 255, 255, 255, 1, 5);
                circle(i + this.sx, this.sy + 150, 20, 255, 255, 255, 1, true);
            } else {
                line(i + this.sx, this.sy, i + this.sx, this.sy - 150, 255, 255, 255, 1, 5);
                circle(i + this.sx, this.sy - 150, 20, 255, 255, 255, 1, true);
            }

            count += 1;
        }
    }

    drawSelf(){
        line(this.sx - 200, this.sy, this.ex + 2.5, this.ey, 255, 255, 255, 1, 10);
        circle(this.sx - 200, this.sy, 35, 255, 255, 255, 1);
    }
}

var path = new Path(canvas.width / 2 - 200, canvas.width / 2 + 200, canvas.height / 2);
path.addNode();
path.addNode();
path.addNode();
path.addNode();
path.addNode();

function tick(){
    clearScreen(0, 0, 0);
    path.render();
}

tick();