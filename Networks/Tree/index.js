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
    constructor(index, totalCount, layerIndex, layerCount){
        this.diffX = 75;
        this.diffY = 500;
        this.lengthX = (totalCount - 1) * this.diffX;

        this.x = this.diffX * index + canvas.width / 2;
        this.x -= this.lengthX / 2;
        this.y = (layerIndex / layerCount) * this.diffY + canvas.height / 2 - this.diffY * 0.375;
    }
}

class Layer{
    constructor(devices, nextLayersDevices = null){
        this.devices = devices;
        this.nextLayersDevices = nextLayersDevices;
        this.connections = [];
        for (let i = 0; i < devices.length; i++) this.connections.push([]);
    }

    draw(){
        this.devices.forEach(device => {
            circle(device.x, device.y, 15, 255, 255, 255, 1, true);
            if (this.nextLayersDevices != null){
                this.nextLayersDevices.forEach(nextDevice => {
                    if (this.checkConnected(device, nextDevice)){
                        line(device.x, device.y, nextDevice.x, nextDevice.y, 255, 255, 255, 1, 2);
                    }
                });
            }
        });
    }
    
    checkConnected(device1, device2){
        if (this.connections[this.devices.indexOf(device1)].includes(device2)){
            return true;
        } else {
            return false;
        }
    }

    addConnection(device1Index, device2Index){
        if (this.nextLayersDevices){
            this.connections[device1Index].push(this.nextLayersDevices[device2Index]);
        }
    }
}

var layer1 = [];
var layer2 = [];
var layer3 = [];
var layer4 = [];

for (let i = 0; i < 5; i++) layer1.push(new Device(i, 5, 0, 4));
for (let i = 0; i < 6; i++) layer2.push(new Device(i, 6, 1, 4));
for (let i = 0; i < 7; i++) layer3.push(new Device(i, 7, 2, 4));
for (let i = 0; i < 8; i++) layer4.push(new Device(i, 8, 3, 4));

layer1 = new Layer(layer1, layer2);
layer2 = new Layer(layer2, layer3);
layer3 = new Layer(layer3, layer4);
layer4 = new Layer(layer4);

var layers = [layer1, layer2, layer3, layer4];

addConnections(0, 30, getPairs(0));
addConnections(1, 42, getPairs(1));
addConnections(2, 56, getPairs(2));


function tick(){
    clearScreen(0, 0, 0);

    layers.forEach(layer => {
        layer.draw();
    });
}

function addConnections(layerIndex, count, freeIndexPairs){
    let freeIndexes = freeIndexPairs;
    let index;
    let pair;

    for (let i = 0; i < count; i++){
        index = Math.floor(Math.random() * freeIndexes.length);
        pair = freeIndexes[index];
        freeIndexes.splice(index, 1);

        layers[layerIndex].addConnection(pair[0], pair[1]);
    }
}

function getPairs(layerIndex){
    if (layerIndex < layers.length){
        let pairs = [];
        let layer = layers[layerIndex];
        let nextLayer = layers[layerIndex + 1];

        for (let i = 0; i < layer.devices.length; i++){
            for (let j = 0; j < nextLayer.devices.length; j++){
                pairs.push([i, j]);
            }
        }

        return pairs;
    }
}


tick();