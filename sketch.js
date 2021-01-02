let x;
let y;

let xspeed;
let yspeed;

let dvd;

let currentColor = 0;

// *** RGB Colors ***: 
// Pink: 234 52 137
// Yellow: 254 249 83
// Teal: 115 250 253
// Dark Blue: 0 46 245
// Orange: 239 137 51
// purple: 174 45 246
// red: 234 64 37

const colorJson = {
    "colors": [
        [234, 52, 137],
        [254, 249, 83],
        [115, 250, 253],
        [0, 46, 245],
        [239, 137, 51],
        [174, 45, 246],
        [234, 64, 37]
    ]
}

let r, g, b;

function preload() {
    dvd = loadImage('dvd_logo.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // x = random(width);
    // y = random(height);
    x = 0;
    y = 0;
    xspeed = 2.5;
    yspeed = 2.5;
    pickColor();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function pickColor() {

    var newColor = Math.floor(random(7));
    // makes sure the number actually changes
    while (newColor == currentColor) {
        newColor = Math.floor(random(7));
    }
    currentColor = newColor;

    r = colorJson.colors[newColor][0];
    g = colorJson.colors[newColor][1];
    b = colorJson.colors[newColor][2];
}

function draw() {
    background(0);
    // rect(x, y, 80, 60);
    // Draw the DVD logo
    tint(r, g, b);
    image(dvd, x, y, dvd.width * 2, dvd.height * 2);

    x = x + xspeed;
    y = y + yspeed;

    if (x + (dvd.width * 2) >= width) {
        xspeed = -xspeed;
        x = width - (dvd.width * 2);
        pickColor();
    } else if (x <= 0) {
        xspeed = -xspeed;
        x = 0;
        pickColor();
    }

    if (y + (dvd.height * 2) >= height) {
        yspeed = -yspeed;
        y = height - (dvd.height * 2);
        pickColor();
    } else if (y <= 0) {
        yspeed = -yspeed;
        y = 0;
        pickColor();
    }
}

function keyPressed() {
    noLoop();
    // Calculates new x and y speeds to make the box hit a random corner
    // Corners are (0, 0), (0, width), (0, height), (width, height) 

    // overall speed of the logo stays the same, so x and y speeds 

    var randomCorner = Math.floor(random(4));
    // var randomCorner = 2;
    
    if (randomCorner == 0) {
        // top left corner
        var yDistance = y;
        var xDistance = x;
    } else if (randomCorner == 1) {
        // top right corner
        var yDistance = y;
        var xDistance = width - (x + (dvd.width * 2));
    } else if (randomCorner == 2) {
        // bottom right corner
        var yDistance = height - (y + (dvd.height * 2));
        var xDistance = width - (x + (dvd.width * 2));
    } else if (randomCorner == 3) {
        // bottom left corner
        var yDistance = height - (y + (dvd.height * 2));
        var xDistance = x;
    }

    var newAngle = Math.atan(yDistance / xDistance);

    // This keeps a constant overall speed by distributing it correctly between the components
    var newXspeed = ((5 * Math.sqrt(2)) / 2) * Math.cos(newAngle);
    var newYspeed = ((5 * Math.sqrt(2)) / 2) * Math.sin(newAngle);

    if (randomCorner == 0) {
        xspeed = -newXspeed;
        yspeed = -newYspeed;
    } else if (randomCorner == 1) {
        xspeed = newXspeed;
        yspeed = -newYspeed;
    } else if (randomCorner == 2) {
        xspeed = newXspeed;
        yspeed = newYspeed;
    } else if (randomCorner == 3) {
        xspeed = -newXspeed;
        yspeed = newYspeed;
    }

    // Adjust where 'x' is depending on the corner

    loop();
}