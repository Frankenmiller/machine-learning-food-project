let vehicles = [];
let food = [];
let poison = [];

function setup() {
  createCanvas(360, 600).center('horizontal');
  for (var i=0; i<10; i++) {
    var x = random(25, width -25);
    var y = random(25, height -25);
    vehicles[i] = new Vehicle(x, y);
  }
  for (var i=0; i<50; i++) {
    var x = random(25, width -25);
    var y = random(25, height -25);
    food.push(createVector(x, y));
  }
  for (var i=0; i<10; i++) {
    var x = random(25, width -25);
    var y = random(25, height -25);
    poison.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  if (random(1) < 0.005) {
    var x = random(25, width -25);
    var y = random(25, height -25);
    food.push(createVector(x, y));
  }

  for (var i=0; i<food.length; i++) {
    fill(245,222,179);
    noStroke();
    ellipse(food[i].x, food[i].y, 15, 15);
    fill(92, 64, 51);
    ellipse(food[i].x + 3, food[i].y + 0, 2.5, 2.5);
    ellipse(food[i].x - 2.5, food[i].y + 3, 2.5, 2.5);
    ellipse(food[i].x + 2, food[i].y - 3, 2.5, 2.5);
    ellipse(food[i].x - 3, food[i].y - 2.5, 2.5, 2.5);
    ellipse(food[i].x, food[i].y, 2, 2);
  }

  for (var i=0; i<poison.length; i++) {
    fill(92, 64, 51);
    noStroke();
    ellipse(poison[i].x + 0, poison[i].y - 3, 8, 8);
    ellipse(poison[i].x + 3, poison[i].y + 2, 8, 8);
    ellipse(poison[i].x - 3, poison[i].y + 2, 8, 8);
    ellipse(poison[i].x, poison[i].y + 2, 8, 8);
  }


  for (var i=vehicles.length -1; i>=0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display();

    if (vehicles[i].dead()) {
      vehicles.splice(i, 1);
    }
  }
}
