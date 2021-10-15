
let locationContainer = document.getElementsByClassName('location-data')[0];
let inputIp = document.getElementsByClassName('ipInput')[0];
let btnLocate = document.getElementsByClassName('btn-locate')[0];
var scale = window.devicePixelRatio;
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth * scale;
canvas.height = window.innerHeight * scale;
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


class Line {
    constructor(x1, y1 , x2 , y2 , color , width) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color
        this.width = width;
    }
    draw() {
        c.beginPath()
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.strokeStyle = this.color;
        c.lineWidth = this.width
        c.stroke();
    }
}

//making lines for other features
let line = new Line(-300,-300,-200, -200, '#25d7dd', 8);
let line1 = new Line(-298,-299,-400, -300, '#25d7dd', 8);
let line2 = new Line(-300,300,-200, 200, '#25d7dd', 8);
let line3 = new Line(-298,299,-400, 299, '#25d7dd',8 );

//making area for form of IP location tracker
let polygonIP = [];
polygonIP[0] = new Line(-700,-250, -300, -250, '#25d7dd' , 2  )  // first sleeping line
polygonIP[1] = new Line(-300, -250, -250, -200, '#25d7dd' , 2  ) // first slant line
polygonIP[2] = new Line(-700,250, -300, 250, '#25d7dd' , 2  ) // sec sleeing line
polygonIP[3] = new Line(-300, 250,-250 , 200, '#25d7dd' , 2  ) //sec slant line
//polygonIP[4] = new Line(-350,-200, -350, 250 , '#25d7dd' , 5  ) // sec standing line

//IP location tracker\
function fetchLocation(ip) {
    fetch(`http://api.ipstack.com/${ip}?access_key=038a88d50d84eb321717f06a53ac26f5`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        locationContainer.innerHTML += `City : ${data.city} <br>`
        locationContainer.innerHTML += `Continent: ${data.continent_name}<br>`
        locationContainer.innerHTML += `Country Code ${data.country_code}<br>`
        locationContainer.innerHTML += `Longitude ${data.longitude}<br>`
        locationContainer.innerHTML += `Latitude ${data.latitude}<br>`
    });
}
function getIpToLocate() {
    locationContainer.innerHTML = '';
    let value = inputIp.value;
    fetchLocation(value);

}




//other features compartment end

let outer;
let maxParticles;
let inner ;
let iinner ;
//constraints for mobiles 
if(innerWidth <= 500) {
     outer = new Circle(0,0 , 150,1.7, 0.0002, 20, '#25d7dd78') // clock
     inner = new Circle(0,0 , 100, 1.5, -0.001, 10, '#25d7dd') // clock
     iinner = new Circle(0,0 , 70, 1.5, 0.003, 10, '#25d7dd') // clock
     maxParticles = 260
}else {
    outer = new Circle(0,0 , 250,1.7, 0.0002, 20, '#25d7dd78') // clock
    inner = new Circle(0,0 , 200, 1.5, -0.001, 10, '#25d7dd') // clock
    iinner = new Circle(0,0 , 170, 1.5, 0.003, 20, '#25d7dd') // clock
    maxParticles = 1500
}



let particles = [];
let colors = ['#00b9b738','#00b9b738']

//filling lots of particles
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
   iinner.update();
   for(let i = 0 ; i<particles.length ; ++i) {
  particles[i].update();

  for (let j = i; j < particles.length; ++j) {
    let dx = particles[i].x - particles[j].x;
    let dy = particles[i].y - particles[j].y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 80) {
        c.beginPath();
        c.strokeStyle = particles[i].color;
        c.moveTo(particles[i].x, particles[i].y);
        c.lineTo(particles[j].x, particles[j].y);
        c.lineWidth = 1
        c.stroke();
            }

        }

    }
    line.draw();
    line1.draw();
    line2.draw();
    line3.draw();


    for (let index = 0; index < polygonIP.length; index++) {
        polygonIP[index].draw();
        
    }
}

animate();