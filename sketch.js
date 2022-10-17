let vehicle;
let food = [];
let poison = [];

function setup() {
  createCanvas(360, 640).center('horizontal');
  vehicle = new Vehicle(width/2, height/2);
  for (var i=0; i<10; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  for (var i=0; i<10; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  let mouse = createVector(mouseX, mouseY);

  for (var i=0; i<food.length; i++) {
    fill(245,222,179);
    noStroke();
    ellipse(food[i].x, food[i].y, 12, 12);
    fill(92, 64, 51);
    ellipse(food[i].x + 3, food[i].y + 0, 2, 2);
    ellipse(food[i].x - 2.5, food[i].y + 3, 2, 2);
    ellipse(food[i].x + 2, food[i].y - 3, 2, 2);
    ellipse(food[i].x - 3, food[i].y - 2.5, 2, 2);
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


  vehicle.eat(food);
  vehicle.eat(poison);
  vehicle.update();
  vehicle.display();

}
