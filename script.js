/** @type {HTMLCanvasElement}*/
    // tells the editor that this is a canvas element project
    // uses intellisense for ctx variables
const canvas = document.getElementById('canvas1'); 
    // sets up canvas by grabbing the html canvas element
const ctx = canvas.getContext('2d');
    // using 2d methods

// SETS UP TO COVER WINDOW WITH JS
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
// removes drawing on hover so it only activates on mousedown
ctx.lineWidth = 0.4;


// GROW A GARDEN
ctx.font = 'bold 20px calibri';
ctx.textAlign = 'left';
ctx. textBaseline = 'left';
ctx.fillStyle = 'rgb(240, 96, 96)';  // a color name or by using rgb/rgba/hex values
ctx.fillText('Grow a Garden', 200, 80); // text and position

// AFFIRMATION
ctx.font = 'bold 20px calibri';
ctx.textAlign = 'left';
ctx. textBaseline = 'left';
ctx.fillStyle = 'rgb(240, 96, 96)';  // a color name or by using rgb/rgba/hex values
ctx.fillText('I am the gardener of my own soul', 220, 840); // text and position


// CLASS that creates an animated STALK growth at random speeds and dir
class Root {
    constructor(x,y){
        this.x = x;
        this.y = y;
            // ATTACHES initial growth of art from mouse x and y coords
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
            // allows root to grow in different speed variables along the x and y axis
            // from -2 to 2 pixels
        this.maxSize = Math.random() * 7 + 2;
            // root grows to a certain point between 5 to 8 pixels 
        this.size = Math.random() * 1 + 2;
            // initial size before root starts growing in a random number 
            // between 2 - 3 pixels
        this.vs = Math.random() * 0.2 + 0.05;
            // defines velocity of the sizes to randomise movements
        this.angleX = Math.random() * 6.2;
            // using trigonometry to angle roots along x axis to create organic shapes
            // set between numbers 0 - 6.2 (radians of 360 degrees)
        this.vax = Math.random() * 0.6 - 0.3;
            // defines velocity of the angles along x axis to randomise movements
        this.angleY = Math.random() * 6.2;
            // using trigonometry to angle roots along y axis to create organic shapes
            // set between numbers 0 - 6.2 (radians of 360 degrees)
        this.vay = Math.random() * 0.6 - 0.3;
            // defines velocity of the angles along y axis to randomise movements
        this.lightness = 10;
            // defines value of the lightness in colours
    }
    // uses a requestFrameAnimation method for each of the many roots to have their own
    // separate animation loops. creates an organic movement
    update () {
        this.x += this.speedX + Math.sin(this.angleX);
            // this animation frame will update this.x from 99 by this.speedX from line 36
            // particles with positive speed values will move to the right
            // particles with negative speed values will move to the left
            // Math.sin will map the movement of roots along a sine wave using the angle from 
            // line 29, oscillating back and forth between +1 and -1 infinitely
            //  this makes the x property move left and right in curvy movements
            // same applies to the Y coordinate.
        this.y += this.speedY + Math.sin(this.angleY);
            // this animation frame will update this.y from 99 by this.speedY from line 37
            // particles with positive speed values will move upwards
            // particles with negative speed values will move downwards
        // both combined will create a random vector (direction and speed of movement) for 
        // each root particle
        this.size += this.vs;
            // this will allow the roots to grow between values from line 48 for each frame
        this.angleX += this.vax;
            // allows root to increasingly curve in values from line 53
        this.angleY += this.vay;
            // allows root to increasingly curve in values from line 58
        
        if (this.lightness < 70) this.lightness += 0.5;

        if (this.size < this.maxSize){
            // if this.size from line 45 is bigger than this.maxSize from line 43
            // draw segments (a circle in this case) over the roots to make it grow
            ctx.beginPath();
            // starts a drawing
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // draws a circle
            ctx.fillStyle = 'hsl(338.82, 10.18%,' + this.lightness + '%)';
            // declares a colour to fill circle from dark to light
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
            // allows this.update to loop a new segment as animation
            // 'update' alone cannot be called here is a method on a class 
            // and must be addressed with 'this.' its instatiated in line 108
            // and calling it from variable in line 111
            // '.bind()' is attached so js remembers that this update is recalling
            // another update this keyword set to the provided value
        } else { // when root reaches max size, create var sunflower
            const flower = new Flower(this.x, this.y, this.size);
            // adds flower to the last segment of the root
            // this.(values) refer to the roots as it is locally declared in the class
            flower.grow();
        }
    }
}


class Flower {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
            // randomises speed of increasing size of ea flower
        this.maxFlowerSize = this.size + Math.random() * 100;
            // defines flower size growth to 50
        this.image = new Image();
        this.image.src = 'sunflower.png';
            // calls image from root folder
        // THIS IS A TERNARY OPERATOR (allows upto 3 operands)
        this.size > 7.5 ? this.willFlower = true : this.willFlower = false;
            // ? = give property,  : = else
        this.angle = 0;
            // to rotate flowers
        this.va = Math.random() * 0.025 - 0.0135;

    };
    grow (){
        if (this.size < this.maxFlowerSize && this.willFlower){
            this.size += this.vs;
                // increase flower size by 0.3 between original size to max size
            this.angle += this.va;
            
            ctx.save();
            ctx.translate(this.x, this.y);
                // calls the original translation of original image
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
                // draws flower to canvas
                // -this.size/2 to offset to center
            ctx.restore();

            requestAnimationFrame(this.grow.bind(this));
        }
    }
};







// MOUSEMOVE EVENT LISTENER
window.addEventListener('mousemove', function(e){
// whenever a mouse movement occurs, this callback fn will run
// This enables access to built-in event objects which stores x and y 
// coordinates of the mouse event. this event object will be called 'e'
    if (drawing) {
        for (let i = 0; i < 3; i++) {
            // this allows for drawing 3 routes in same spot made in a 'for' loop
            const root = new Root(e.x, e.y);
            // creates a new const var 'root' every loop as new Root()
            // holds a single instance of root class which has access to the 
            // update method mentioned above
            root.update();
        }
    }
});
    
// MOUSEDOWN EVENT LISTENER TO ACTIVATE DRAWING
window.addEventListener('mousedown', function(){
    drawing = true;
});
// this activates drawing to true when mouse down event is triggered

// MOUSEDOWN EVENT LISTENER TO DEACTIVATE DRAWING
window.addEventListener('mouseup', function(){
    drawing = false;
});
// this deactivates drawing to false when mouse down event is triggered