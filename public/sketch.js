
let img;
let ww = 500;
let hh = 500;
let zoomZ = -50;
let rotangle = 3;
let r = 200;
let rx = 0;
let ry = 0;
let position
class Position {
    r = 200
    constructor(lat, lon, r) {
        let thetha = PI / 2 + radians(lat);
        let phi = PI / 2 - radians(lon);
        this.cX = -(r * sin(thetha) * cos(phi));
        this.cZ = -(r * sin(phi) * sin(thetha));
        this.cY = (r * cos(thetha));
        let posvector = createVector(this.cX, this.cY, this.cZ);
        this.xaxis = createVector(0, 1, 0);
        this.raxis = p5.Vector.cross(this.xaxis, posvector);
        //let angleb = p5.Vector.angleBetween(xaxis,posvector);
        this.angleb = this.xaxis.angleBetween(posvector)

    }

    drawIcon(r) {
        push();
        translate(position.cX, position.cY, position.cZ);
        rotate(position.angleb, [position.raxis.x, position.raxis.y, -position.raxis.z]);
        const boxheight = position.dmag - r / 2;

        fill(200, 0, 255);
        //normalMaterial();
        box(boxheight, 1, 1);
        box(5, 5, 40);

        pop();
    }
}


/*
async function getCoords(url = '') {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'X-RapidAPI-Key': '331cce4ef2msh7656ea5b11ff5afp1115bejsn0effa1a5d063'
        }
    };
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    position = new Position(data.lat, data.lon, r);
}

async function getC(url = '') {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'X-RapidAPI-Key': '331cce4ef2msh7656ea5b11ff5afp1115bejsn0effa1a5d063'
        }
    };
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    position = new Position(data.lat, data.lon, r);
}*/



function preload() {
     const loadData = async () => {
        const response2 = await fetch('/weather')
        const data = await response2.json()
        position = new Position(data.lat, data.lon, r);
        console.log(data)
    }
    loadData()
    
    //console.log(data)
    /*const url = 'https://weatherapi-com.p.rapidapi.com/ip.json?q=83.37.21.90'

    getCoords(url);
*/

    img = loadImage('./assets/earth.jpg');
    //earthquakes = loadStrings("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
    // earthquakes = loadStrings('all_month.csv');
}

function setup() {
    createCanvas(ww, hh, WEBGL);



}



function draw() {
    background(0, 0, 0);
    background(0);

    translate(0, 0, zoomZ);

    //Draw and rotate earth
    rotateY(rx);
    rotateX(-ry * 2);
    texture(img);
    sphere(r);


    pointLight(255, 255, 255, 0, 0, 0);
    ambientLight(100, 200, 255);
    pointLight(255, 255, 255, 1, 1, 0);

    //Apply mouse drag rotations
    //rotateY(rx);
    //rotateX(ry);

    if (mouseIsPressed) {
        rx += (mouseX - pmouseX) / 100;
        ry += (mouseY - pmouseY) / -800;
    }
    let dirX = mouseX - width / 2;
    let dirY = mouseY - height / 2;


    // Draw position

    if (position) {
        // console.log(position);
        if (position.x === null) return
        position.drawIcon(r)

    }

    //rotangle = rotangle + 0.05;
}




function mouseMoved() {

}


function mousePressed() {


}

function mouseWheel(event) {
    //print(event.delta);
    //move the square according to the vertical scroll amount
    zoomZ += event.delta;
    //uncomment to block page scrolling
    //return false;
}




window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseMoved = mouseMoved;
window.mousePressed = mousePressed;
window.mouseWheel = mouseWheel;