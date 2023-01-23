//Egg Amoebas
//1-14-2023,Huichuan Wang
/*
It is a array of amoebas shapes like fried eggs, so I named it egg amoeba.
I want to show it like real amoebas crawling zigzaggy. It will react to your sound, like a biological stress response. They also would like to communicate to each other,when they get close they will change color and concat together, exchange pheromones.
When you make a sound, yellow dots are generated at random positions, and their radius is your volume.When your sound is higher than the threshold, the background change.
*/
//Acknowledgements (references, links, inspirations, etc:
//noise loop references:https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn
//mic threshold : https://editor.p5js.org/p5/sketches/Sound:_Mic_Threshold
//particle system: https://p5js.org/examples/simulate-particles.html

let mic;
let phase = 0;
let zoff = 0;

let noiseCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();

  for (let i = 0; i < 25; i++) {
    let x = random(width);
    let y = random(height);
    let r1 = random(0.2, 1.2);
    let zoffUpdate1 = random(0.001, 0.0001);
    let noiseMax1 = random(0, 1.5);

    noiseCircles[i] = new NoiseCircle(x, y, r1, zoffUpdate1, noiseMax1);
  }
}

function draw() {
  let vol = mic.getLevel() * 5;

  updateBG();
  randomPoints();
  soundThreshod();
  for (let i = 0; i < noiseCircles.length; i++) {
    noiseCircles[i].Draw(vol);
    //littleCircle.move();
    noiseCircles[i].crawling();

    //communication
    let overlapping = false;
    for (let j = 0; j < noiseCircles.length; j++) {
      if (i != j) {
        if (noiseCircles[j] != noiseCircles[i] && noiseCircles[i].communication(noiseCircles[j])) {
          overlapping = true;
          stroke(230, 238, 156, 100);
          strokeWeight(4);
          line(noiseCircles[i].x,noiseCircles[i].y,noiseCircles[j].x,noiseCircles[j].y);
        }
      }
      //change color
      if (overlapping) {
        let c1 = color(255, 152, 0, 50);
        noiseCircles[i].changeColor(c1);
      } else {
        let c2 = color(230, 238, 156, 25);
        noiseCircles[i].changeColor(c2);
      }
    }
    //noStroke();
  }
    
}

function mousePressed() {
  let r2 = random(0.2, 1.2);
  let zoffUpdate2 = random(0.05, 0.0001);
  let noiseMax2 = random(0, 1.5);
  let n = new NoiseCircle(mouseX, mouseY, r2, zoffUpdate2, noiseMax2);
  noiseCircles.push(n);
}

function updateBG() {
  noStroke();
  //fill(210,210,255,20);
  fill(0, 100, 30, 5);
  rect(0, 0, width, height);
}

function soundThreshod() {
  let vol = mic.getLevel();
  let threshold1 = 0.03;
  if (vol > threshold1) {
    fill(255, 255, 0);
    strokeWeight(1);
    stroke(255);
    ellipse(random(width), random(height), vol * 100);
  }

  let threshold2 = 0.4;
  if (vol > threshold2) {
    fill(0);
    ellipse(width / 2, height / 2, height, height);
  }
}

function randomPoints() {
  stroke(255, 255, 180);
  strokeWeight(1);
  fill(random(120, 255), random(120, 255), random(120, 255), random(100));
  ellipse(random(width), random(height), random(2, 25));
}
