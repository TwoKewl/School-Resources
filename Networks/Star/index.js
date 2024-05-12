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

class Device{
    constructor(isRouter, deviceRadius, index = 0, totalCount = 0){
        this.isRouter = isRouter;
        if (isRouter){
            this.x = 0;
            this.y = 0;
            this.radius = deviceRadius;
        } else {
            this.angle = (index / totalCount) * 2 * Math.PI;
            this.x = Math.sin(this.angle) * 400;
            this.y = Math.cos(this.angle) * 400;
            this.radius = deviceRadius;
        }

        this.x += canvas.width / 2;
        this.y += canvas.height / 2;
    }

    draw(){
        if (this.isRouter){
            circle(this.x, this.y, this.radius, 255, 255, 255, 1, true);
        } else {
            circle(this.x, this.y, this.radius, 150, 150, 150, 1, true);
        }
    }
}

var router = new Device(true, 20);
var devices = [];
for (let i = 0; i < 25; i++){
    devices.push(new Device(false, 20, i, 25));
}

function tick(){
    clearScreen(0, 0, 0);
    devices.forEach(device => {
        line(router.x, router.y, device.x, device.y, 100, 100, 100, 1, 2);
        device.draw();
    });

    router.draw();

    rect(canvas.width / 2 - 430, canvas.height / 2 - 430, 860, 860, 255, 0, 0, 1, false);
}

tick();