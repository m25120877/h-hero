var numNotes = 6;
var notes = [];
var xStart = 20;
var yStart = 20;
var rectWidth = 50;
var rectHeight = 20;
var colors = [[200,20,10],[200,200,20],[20,200,20],[20,20,200],[20,120,120],[40,80,120]];
var hitBox;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

for (var i=0; i<numNotes; i++) {

  notes[i] = new Note (xStart + (i*100),yStart,rectWidth,rectHeight,colors[i]);
  notes[i].display();
}


hitbox = new HitBox();
hitbox.display();

}

function draw() {
  background(0);
  for (var i=0; i<numNotes; i++) {

    notes[i].updateColor();
    notes[i].update();
    notes[i].display();
  }
  hitbox.display();
}

var HitBox = function() {


  this.display = function() {
    fill([20,200,20]);
    rect(10,750,800,40);
  }


};

var Note = function (x,y,widthIn,heightIn,color) {
  this.x = x;
  this.y = y;
  this.speed = random(1.0,4.0);
  this.width = widthIn;
  this.height = heightIn;
  this.color = color;


  this.display = function() {
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
  },

  this.update = function() {
      this.y = this.y + this.speed;
  }

  this.updateColor = function () {
    this.color = [random(100),random(100),random(100)];
  }


}
