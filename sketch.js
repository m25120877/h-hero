var numNotes = 6;
var tempo = 5;
var notes = [];
var xStart = 20;
var yStart = 20;
var rectWidth = 50;
var rectHeight = 20;
var colors = [[200,20,10],[200,200,20],[20,200,20],[20,20,200],[20,120,120],[40,80,120],[200,20,10],[200,200,20],[20,200,20],[20,20,200],[20,120,120],[40,80,120]];
//var freqs = [280,320,360,400,440,480,520,560];
var freqs = [196,247,294,392,493,587,784];
var indexCounter=0;
var indexes = [0,1,2,0,1,2,0,0,2,2,6];
var hitBox;
var osc, env;
var playing =false;
var score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor=(100,100,0);

    env = new p5.Env();
    // env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setADSR(0.01, 0.1, 0.2, 0.5);
     env.setRange(1.0, 0);
    osc = new p5.Oscillator('sine');
    osc.freq(300);
    // osc.amp(0);
    osc.amp(env);
    osc.start();

    notes[0] = new Note (xStart, yStart, freqs[0], rectWidth, rectHeight, colors[0]);

    makeNote();

//
// for (var i=0; i<numNotes; i++) {
//
//   notes[i] = new Note (xStart + (i*100), yStart, freqs[i], rectWidth, rectHeight, colors[i]);
//   notes[i].display();
// }


  hitbox = new HitBox();
  hitbox.display();
  // textSize(30);
  // fill(120,120,20);
  // text("hit", 100,10);
}

function draw() {
   background(backgroundColor);

  for (var i=0; i<notes.length; i++) {
    notes[i].checkHit();
    notes[i].updateColor();
    notes[i].update();

    if (notes[i].dead) {
      // console.log("dead note");
    }

    notes[i].display();
    //  console.log(i);
  }
  hitbox.display();
  textSize(40);
  fill(120, 120, 20);
  text(score, 300, 50);

  // textSize(32);
// text("word", 10, 30);
}

// function keyPressed() {
//  var hit = false;
//     for (var i=0; i<numNotes; i++) {
//         if (notes[i].y > 500 && notes[i].y>540) {
//             hit = true;
//         }
//     }
//  if (hit==true) {
//     if(!playing){
//         osc.amp(0.2,0.05);
//          playing = true;
//         setTimeout(turnOffOsc, 200);
//      }
//   }
// }


function keyPressed() {

  for (var i=0; i<notes.length; i++) {
    notes[i].checkScore();
  }

}



var makeNote = function() {
  // var randomIndex = int(random(numNotes));
//  var newNote = new Note (xStart + (100*randomIndex), yStart, freqs[randomIndex], rectWidth, rectHeight, colors[randomIndex]);

  var index = indexes[indexCounter%11];
  // console.log(indexCounter);
  // console.log(indexCounter%3);
  console.log(yStart);
  var newNote = new Note (xStart + (100*index), yStart, freqs[index], rectWidth, rectHeight, [200,200,200]);
  indexCounter = indexCounter+1;


  notes.push(newNote);
  // console.log(notes);

  setTimeout(makeNote,tempo*100*int(random(1,4)));
}

 makeNote = makeNote.bind(this);

function turnOffOsc() {
     osc.amp(0,0.5);
     playing = false;
}

var HitBox = function() {
  this.fillColor = [20,200,20];
  this.display = function() {
    fill(this.fillColor);
    rect(10,500,800,40);
  }
};

var Note = function (x, y, freq, widthIn, heightIn, color) {
  this.x = x;
  this.y = y;
  // this.speed = random(1.0,4.0);
  this.speed = tempo;
  this.freq = freq;
  this.width = widthIn;
  this.height = heightIn;
  this.color = color;
  this.playing = false;
  this.hit = false;


  this.display = function() {
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
    // console.log(this.x,this.y);
  },

  this.checkHit = function() {
    if(this.y > 460 && !this.playing) {
      // console.log("should make a sound here");
      this.playing = true;
      osc.freq(this.freq);
      env.play();
    };
  },

  this.checkScore = function() {

    if(this.y > 460 && this.y < 540) {
      console.log(this);
      this.height = 100;
      this.color = [220,20,20];
      this.hit=true;
      score = score + 1;

    }

  },


  this.update = function() {
      this.y = this.y + this.speed;
      if (this.y > 1000) {
        this.dead = true;
      }
  },

  this.updateColor = function () {
    if(!this.hit) {
       this.color = [random(100),random(100),random(100)];
    }

  }


}
