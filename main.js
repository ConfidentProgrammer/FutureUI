let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
let c = canvas.getContext('2d');

//setting timing to the Design
let t = document.getElementsByClassName("time")[0];

console.log(window.innerWidth);
console.log(window.innerHeight)
setInterval(function() {
    let today = new Date();
    t.innerHTML = `${today.getHours()} : ${today.getMinutes()} : ${today.getSeconds()} `;
}, 1000) 



c.translate(innerWidth /2 , innerHeight/2)

class Particle {
    constructor(x, y, dx, dy, color, radius) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.color = color;
        this.dx = dx;
        this.radius = radius;

    }


    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        if (this.x + this.radius >= innerWidth/2 || this.x - this.radius <= -innerWidth / 2) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= innerHeight/ 2 || this.y - this.radius <= -innerHeight / 2) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
        this.x += this.dx;
        //molecule big
    }



}


class Circle {  //arcs
    constructor(x , y, r , factor, speed, width, color) {
      
        this.x = x
        this.y = y
        this.r = r
        this.factor = factor   
        this.test = 0; 
        this.speed = speed
        this.width = width
        this.color = color
    }

    draw() {
       
        c.beginPath()
        c.arc(this.x , this.y, this.r, Math.PI*this.test , Math.PI * this.factor, false);
        c.strokeStyle = this.color;
        c.lineWidth = this.width
        c.stroke();
        
       
    }
    update() {
        
        this.factor += this.speed 
        this.test += this.speed 
        this.draw();
        //this.rotFac += this.rotFac/1000000
    }
}
let outer;
let maxParticles;
let inner ;
if(innerWidth <= 500) {
     outer = new Circle(0,0 , 150,1.7, 0.0002, 20, '#25d7dd78') // clock
     inner = new Circle(0,0 , 100, 1.5, -0.001, 10, '#25d7dd') // clock
     maxParticles = 260
}else {
    outer = new Circle(0,0 , 250,1.7, 0.0002, 20, '#25d7dd78') // clock
    inner = new Circle(0,0 , 200, 1.5, -0.001, 10, '#25d7dd') // clock
    maxParticles = 900
}



let particles = [];
let colors = ['#00b9b738','#00b9b738']

for(let i = 0 ; i<maxParticles ; ++i) {
    let dx = (Math.random() - 0.5) * 0.5;
    let dy = (Math.random() - 0.5) * 0.5;
    let radius = Math.random() * 5;
    let x = Math.random() * (2*innerWidth-innerWidth/2) + (-innerWidth/2);
    let y = Math.random() * (2*innerHeight-innerHeight/2) + (-innerHeight/2) ;
    let color =colors[Math.round(Math.random())];

   particles.push(new Particle(x, y, dx ,dy, color, radius))
}

//writing text to the canvas

function animate() {
    c.clearRect(-innerWidth/2, -innerHeight/2, innerWidth, innerHeight);
    c.fillStyle = 'black'
    requestAnimationFrame(animate);
    outer.update();
   inner.update();

   for(let i = 0 ; i<particles.length ; ++i) {
  particles[i].update();

  for (let j = i; j < particles.length; ++j) {
    let dx = particles[i].x - particles[j].x;
    let dy = particles[i].y - particles[j].y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
        c.beginPath();
        c.strokeStyle = particles[i].color;
        c.moveTo(particles[i].x, particles[i].y);
        c.lineTo(particles[j].x, particles[j].y);
        c.lineWidth = 1
        c.stroke();
    }

}

}

}

animate();