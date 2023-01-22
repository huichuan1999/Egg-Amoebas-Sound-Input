class NoiseCircle {
  constructor(_x, _y, _br, zoffUpdate, noiseMax) {
    this.x = _x;
    this.y = _y;
    //the basic r
    this.br = _br;
    this.color = color(27, 89, 31);
    this.xSpeed = random(-0.7, 0.7);
    this.ySpeed = random(-0.7, 0.7);
    this.zoffUpdate = zoffUpdate;
    this.noiseMax = noiseMax;
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
  
  crawling() {
    let angle=noise(this.x/500, this.y/500, frameCount/20)*TWO_PI*2; //0-2PI
    
    this.x += this.xSpeed * cos(angle)*3;
    this.y += this.ySpeed * sin(angle)*3;
    
    //bouncing
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
  }

  communication(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.br * 50 + other.br * 50;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  changeColor(c) {
    this.color = c;
  }

  Draw(r) {
    push();
    translate(this.x, this.y);
    stroke(255, 255, 200);
    strokeWeight(1);
    
    let alpha1 = map(sin(zoff), -1,1,0,255);
    
    fill(this.color,alpha1);
    beginShape();

    //this.noiseMax = map(r, 0, 0.5, 1, 5);
    for (let a = 0; a < TWO_PI; a += radians(5)) {
      let xoff = map(cos(a + phase), -1, 1, 0, this.noiseMax + r);
      let yoff = map(sin(a + phase), -1, 1, 0, this.noiseMax + r);
      let rad = r + map(noise(xoff, yoff, zoff), 0, 1, r, this.br * 100);
      let x = rad * cos(a);
      let y = rad * sin(a);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    phase += 0.001;
    zoff += this.zoffUpdate;
    
    //draw core

    let alpha2 = map(r, 0, 0.5, 20, 255);

    fill(255, 255, 200, alpha1);
    ellipse(0, 0, r + this.br * 30);
    
    fill(255, 0, 0, alpha2);
    ellipse(0, 0, r + this.br * 20);
    
    pop();
  }
}
