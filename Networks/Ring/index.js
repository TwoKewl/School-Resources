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
        this.index = index + 1;
        this.totalCount = totalCount;
        this.radius = radius;
        this.connections = [];
        this.angle = (this.index / this.totalCount) * 2 * Math.PI;
        this.x = Math.sin(this.angle) * this.radius + canvas.width / 2;
        this.y = Math.cos(this.angle) * this.radius + canvas.height / 2;
    }

    draw(){
        circle(this.x, this.y, 15, 255, 255, 255, 1, true);

        this.connections.forEach(connection => line(this.x, this.y, connection.x, connection.y, 255, 255, 255, 1, 2))
    }

    addConnection(device){
        this.connections.push(device);
    }
}

let count = 12;

var devices = [];
for (let i = 0; i < count; i++){
    devices.push(new Device(i, count, 300));
}

for (let i = 0; i < devices.length; i++){
    devices[i].addConnection(devices[(i + 1) % devices.length]);
}

function tick(){
    clearScreen(0, 0, 0);
    devices.forEach(device => device.draw());
}

tick();