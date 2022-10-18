class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 5;
    this.maxforce = 1.0;
    this.dna = [];
    this.dna[0] = random(-5, 5);
    this.dna[1] = random(-5, 5);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  behaviors = function(good, bad) {
    var steerG = this.eat(good);
    var steerB = this.eat(bad);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  eat = function(list) {
    var record = Infinity;
    var closest = -1;
    for (var i=0; i<list.length; i++) {
      var d = dist(this.position.x, this.position.y, list[i].x, list[i].y);
      if (d < record) {
        record = d;
        closest = i;
      }
    }
    if (record < 8) {
      list.splice(closest, 1);
    } else if (closest != -1) {
      // if another bug arises you can change this line to (closest > -1)
      return this.seek(list[closest]);
    }
    return createVector(0, 0);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
    // this.applyForce(steer);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    stroke(0, 255, 0);
    line(0, 0, 0, this.dna[0] * 10);
    stroke(255, 0, 0);
    line(0, 0, 0, this.dna[1] * 10);
    pop();
  }
}