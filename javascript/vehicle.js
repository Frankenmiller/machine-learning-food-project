class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 1;
    this.maxforce = .18;
    this.dna = [];
    this.dna[0] = random(-5, 5);
    this.dna[1] = random(-5, 5);
    this.health = 1;
  }

  // Method to update location
  update() {
    this.health -= 0.001
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
    var steerG = this.eat(good, 0.1);
    var steerB = this.eat(bad, -0.5);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  eat = function(list, nutrition) {
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
      this.health += nutrition;
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

  dead = function() {
    return (this.health < 0);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    stroke(255, 0, 0);
    rect(-1, 0, 1, this.dna[0] * 20);
    stroke(0, 255, 0);
    rect(-1, 0, 1, this.dna[1] * 20);

    var BLACK = color(0, 0, 0);
    var WHITE = color(255, 255, 255);
    var COLOR = lerpColor(BLACK, WHITE, this.health);
    var BORDER = lerpColor(WHITE, BLACK, this.health);

    fill(COLOR);
    strokeWeight(2);
    stroke(BORDER);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}