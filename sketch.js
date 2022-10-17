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
  translate(0, 50);

  let mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  for (var i=0; i<food.length; i++) {
    fill(154, 205, 50);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  // Call the appropriate steering behaviors for our agents
  vehicle.seek(mouse);
  vehicle.update();
  vehicle.display();

}