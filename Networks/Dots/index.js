var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.screen.width;
canvas.height = window.screen.height;
document.body.classList.add("remove-scrolling");

// All of the functions to draw objects
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

function mouseMoveHandler(evt){
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (evt.clientX - rect.left) * scaleX;
    const mouseY = (evt.clientY - rect.top) * scaleY;
    mousePos = [mouseX, mouseY];
}


// Dot class for the moving points
class Dot{
    constructor(x, y){
        if (x){
            this.x = x;
        } else {
            this.x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
        }

        if (y){
            this.y = y;
        } else {
            this.y = Math.floor(Math.random() * (canvas.height - 100)) + 50;
        }
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = 2;
        this.dx = Math.sin(this.angle) * this.speed;
        this.dy = Math.cos(this.angle) * this.speed;
    }

    tick(dots){
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.dx < 0 || this.x + this.dx > canvas.width){
            this.dx *= -1;
        }
        if (this.y + this.dy < 0 || this.y + this.dy > canvas.height){
            this.dy *= -1;
        }

        this.nearbyDots = this.getNearbyDots(dots);

        this.nearbyDots.forEach(dot => {
            line(this.x, this.y, dot[0].x, dot[0].y, 100, 100, 255, dot[1], 2);
        })
    }

    getNearbyDots(dots){
        let nearbyDots = [];
        let maxDist = 250;

        dots.forEach(dot => {
            if (dot != this){
                let dist = this.getDistance(dot.x, dot.y);
        
                if (dist < maxDist){
                    nearbyDots.push([dot, (-dist + maxDist) / maxDist]);
                }
            }
        });

        return nearbyDots;
    }

    getDistance(otherX, otherY){
        return Math.sqrt((this.x - otherX)**2 + (this.y - otherY)**2);
    }
}

// Creating the dots
var dots = [];
for (let i = 0; i < 50; i++){
    dots.push(new Dot());
}

// Main tick, called 60 times a second
function tick(){
    clearScreen(10, 10, 25);

    dots.forEach(dot => dot.tick(dots));
}

setInterval(tick, 1000/60, false);