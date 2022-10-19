let termites = [];
let food = [];
let poison = [];

let canvas_width;
let canvas_height;

if (screen.width > 700) {
  canvas_width = 400;
  canvas_height = 650;
} else {
  canvas_width = 360;
  canvas_height = 600;
}

function setup() {
  createCanvas(canvas_width, canvas_height).center('horizontal');
  for (var i=0; i<5; i++) { // <!-------------- initial number of termites -->
    var x = random(25, width -25);
    var y = random(25, height -25);
    termites[i] = new Termite(x, y);
  }
  for (var i=0; i<50; i++) { // <!----------------------- volume of food ---->
    var x = random(25, width -25);
    var y = random(25, height -25);
    food.push(createVector(x, y));
  }
  for (var i=0; i<20; i++) { // <!--------------------- volume of poison ---->
    var x = random(25, width -25);
    var y = random(25, height -25);
    poison.push(createVector(x, y));
  }
}

function draw() {
  background(100);

  if (random(1) < 0.025) { // <!-------------------------- replenish food ---->
    var x = random(25, width -25);
    var y = random(25, height -25);
    food.push(createVector(x, y));
  }
  if (random(1) < 0.003) { // <!--------------------- scatter random poison -->
    var x = random(25, width -25);
    var y = random(25, height -25);
    poison.push(createVector(x, y));
  }

  for (var i=0; i<food.length; i++) { // <!--------------------- draw food -->
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

  for (var i=0; i<poison.length; i++) { // <!------------------ draw posion -->
    fill(92, 64, 51);
    noStroke();
    ellipse(poison[i].x + 0, poison[i].y - 3, 8, 8);
    ellipse(poison[i].x + 3, poison[i].y + 2, 8, 8);
    ellipse(poison[i].x - 3, poison[i].y + 2, 8, 8);
    ellipse(poison[i].x, poison[i].y + 2, 8, 8);
  }


  for (var i=termites.length -1; i>=0; i--) {
    termites[i].boundaries();
    termites[i].behaviors(food, poison);
    termites[i].update();
    termites[i].display();

    var offspring = termites[i].clone();
    if (offspring != null) {
      var x = termites[i].position.x;
      var y = termites[i].position.y;
      food.push(createVector(x + 10, y - 10));      
      food.push(createVector(x - 10, y - 10));    
      termites.push(offspring);
    }

    if (termites[i].dead()) {
      var x = termites[i].position.x;
      var y = termites[i].position.y;
      food.push(createVector(x, y));
      termites.splice(i, 1);
    }
  }
}
