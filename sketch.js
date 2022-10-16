let vehicle;
let food = [];

function setup() {
  createCanvas(640, 360).center('horizontal');
  vehicle = new Vehicle(width/2, height/2);
  for (var i=0; i<10; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  let mouse = createVector(mouseX, mouseY);

  for (var i=0; i<food.length; i++) {
    fill(154, 205, 50);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  vehicle.eat(food);
  vehicle.update();
  vehicle.display();

}

