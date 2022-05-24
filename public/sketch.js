
let img;
let ww = 500;
let hh = 500;
let zoomZ = -50;
let rotangle = 3;
let r = 200;
let rx = 0;
let ry = 0;
let position

let countries = []
let i = 0, j = 0;
let wheelX = 0
let wheelY = 0
let wheelZ = 0
let wheelActive = 0
let cam
class Position {
    //r = 200
    // https://www.youtube.com/watch?v=-ny7psXNdUU
    rectangularToSpherical(thetha, phi, deep) {
        this.cX = -(r * sin(thetha) * cos(phi));
        this.cZ = -(r * sin(phi) * sin(thetha));
        this.cY = (r * cos(thetha));
        return [this.cX, this.cY, this.cZ];
    }
    constructor(lat, lon, r, temp) {
        this.lat = lat;
        this.lon = lon;
        const thetha = PI / 2 + radians(lat);
        const phi = PI / 2 - radians(lon);

        this.posvector = createVector(...this.rectangularToSpherical(thetha, phi, r));
        const vecUnitX = createVector(1, 0, 0);
        this.raxis = p5.Vector.cross(vecUnitX, this.posvector);
        this.angleb = vecUnitX.angleBetween(this.posvector)
        this.angleb = Math.abs(this.angleb);
        this.pg = createGraphics(200, 200);
        this.pg.textSize(30);
        this.pg.text(temp + 'º', 0, 100);
    }

    drawIcon(r) {
        push();
        translate(this.posvector.copy().mult(1.04));
        rotate(this.angleb, [this.raxis.x, this.raxis.y, this.raxis.z]);
        texture(t1)
        //box(200,1,1);

        rotateX(radians(180));
        rotateY(radians(270));
        rotateZ(radians(90));
        plane(20, 20)


        texture(this.pg);
        rotateX(0);
        noStroke();
        plane(50);
        pop();
    }
}

let t1
let icons = {}

function preload() {
    const loadData = async () => {
        const response = await fetch('/info/83.37.21.90')
        const data = await response.json()
        position = new Position(data.lat, data.lon, r);
        //console.log(data)
    }
    t1 = loadImage('/assets/116.webp');


    loadData()


    const loadContrie = async (location) => {
        const response = await fetch('/weather/' + location)
        const data = await response.json()
        console.log(data)
        const pos = new Position(data.location.lat, data.location.lon, r, data.current.temp_c);
        countries.push(pos)

    }
    const loadContries = async () => {
        const response = await fetch('/weathers/')
        const data = await response.json()
        console.log(data)
        data.forEach((element, i) => {
            //console.log(i, element.location)
            const pos = new Position(element.location.lat, element.location.lon, r, element.current.temp_c);
            icons[element.current.contidion.icon]
            //countries.push(pos)
        })
        console.log('icons:', icons)
    }

    loadContries()
    /* loadContrie('germany')
     loadContrie('moscow')
     loadContrie('Australia')*/

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
    cam = createCamera();
    cam.camera(0, 0, -600, 0, 0, 0, 0, 1, 0);

}



function draw() {
    background(205, 105, 94);
    //orbitControl();
    //cam.eyeZ = cam.defaultEyeZ;
    //pg.background(255);
    //pg.text('hello!', 0, 100);
    translate(0, 0, zoomZ);

    //Draw and rotate earth
    rotateY(rx);
    rotateX(-ry * 2);
    fill('blue')
    texture(img);
    sphere(r);


    pointLight(255, 255, 255, 400, 400, 400);
    ambientLight(100);
    pointLight(255, 255, 255, 1, 1, 0);
    pointLight(250, 250, 250, mouseX - width / 2, mouseY - height / 2, 50);
    noStroke();
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
        // position.drawIcon(r)
    }

    countries.forEach(country => {
        country.drawIcon(r)
    });

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
    if (wheelActive === 0) {
        wheelX += event.delta;
    } else if (wheelActive === 1) {
        wheelY += event.delta;
    } else if (wheelActive === 2) {
        wheelZ += event.delta;

    }
}

function keyTyped() {
    if (key === 'i') {
        wheelActive = 0
        console.log('activo whell 0')
    } else if (key === 'o') {
        wheelActive = 1
        console.log('activo whell 1')

    } else if (key === 'p') {
        wheelActive = 2
        console.log('activo whell 2')

    }


    if (key === 'q') {
        i += 0.05;
        console.log(i)
    } else if (key === 'a') {
        j += 0.05;
        console.log(j)
    } else if (key === 'w') {
        i -= 0.05;
        console.log(i)
    } else if (key === 's') {
        j -= 0.05;
        console.log(j)
    }
    // uncomment to prevent any default behavior
    // return false;
}


window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseMoved = mouseMoved;
window.keyTyped = keyTyped;
window.mousePressed = mousePressed;
window.mouseWheel = mouseWheel;