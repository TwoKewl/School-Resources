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
    constructor(index, totalCount, radius){
        this.radius = radius;
        this.angle = (index / totalCount) * 2 * Math.PI;

        this.x = Math.sin(this.angle) * radius + canvas.width / 2;
        this.y = Math.cos(this.angle) * radius + canvas.height / 2;
    }

    draw(){
        circle(this.x, this.y, 20, 255, 255, 255, 1, true);
    }
}

var devices = [];
for (let i = 0; i < 10; i++){
    devices.push(new Device(i, 10, 300));
}

function tick(){
    clearScreen(0, 0, 0);

    devices.forEach(device => {
        for (let i = devices.indexOf(device); i < devices.length; i++){
            line(device.x, device.y, devices[i].x, devices[i].y, 150, 150, 150, 1, 2);
        }

        device.draw();
    });
    
    rect(canvas.width / 2 - devices[0].radius - 10, canvas.height / 2 - devices[0].radius - 25, devices[0].radius * 2 + 20, devices[0].radius * 2 + 50, 255, 0, 0, 1, false);
}

tick();