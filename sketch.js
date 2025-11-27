let layers = [];

let backgroundImg;
let fore1;
let fore2;

function preload() {
    backgroundImg = loadImage("assets/back.png");
    fore1 = loadImage("assets/fore1.png");
    fore2 = loadImage("assets/fore2.png")
}

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    imageMode(CENTER);

    // Create Layer instances with parallax factor
    layers.push(new Layer(backgroundImg, 725, 3, 700, 750, 0.01)); // background moves less
    layers.push(new Layer(fore1, 800, 20, 700, 900, 0.2));       // foreground moves more
    layers.push(new Layer(fore2, 1050, 50, 800, 1300, 0.75));
}

function draw() {
    background(100);

    // Draw all layers with parallax based on mouse position
    for (let layer of layers) {
        layer.draw(mouseX, mouseY);
    }
}

function mouseWheel(event) {
    // Forward scroll to all layers
    for (let layer of layers) {
        layer.handleScroll(event);
    }
}

// Layer class
class Layer {
    img;
    imgSize;
    resizeSpeed;
    minCon;
    maxCon;
    parallaxFactor; // new field for mouse-based parallax

    constructor(img, imgSize, resizeSpeed, minCon, maxCon, parallaxFactor) {
        this.img = img;
        this.imgSize = imgSize;
        this.resizeSpeed = resizeSpeed;
        this.minCon = minCon;
        this.maxCon = maxCon;
        this.parallaxFactor = parallaxFactor;
    }

    draw(mouseXPos, mouseYPos) {
        // Calculate offset based on mouse position
        let offsetX = (mouseXPos - width / 2) * this.parallaxFactor;
        let offsetY = (mouseYPos - height / 2) * this.parallaxFactor;

        // Draw the image with the offset applied
        image(this.img, width / 2 + offsetX, height / 2 + offsetY, this.imgSize, this.imgSize);
    }

    handleScroll(event) {
        if (event.delta > 0) {
            this.imgSize -= this.resizeSpeed;
        } else {
            this.imgSize += this.resizeSpeed;
        }

        this.imgSize = constrain(this.imgSize, this.minCon, this.maxCon);
    }
}
