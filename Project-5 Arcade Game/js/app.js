// Enemies our player must avoid
var Enemy = function(x,y,v) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  this.x = x;
  this.y = y;
  this.v = v;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x +=  this.v*dt;
  if (this.x > 460) this.x = -10;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var enemy1 = new Enemy(-120,60,200);
var enemy2 = new Enemy(-120,140,300);
var enemy3 = new Enemy(-120,220,500);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.player = "images/char-horn-girl.png";
    this.x = 200;
    this.y = 300;
  }

  update() {
    if (this.x < 0) this.x = 0;
    if (this.x > 400) this.x = 400;
    if (this.y < -20) this.y = -20;
    if (this.y > 400) this.y -= 80;
  }

  render() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
  }

  handleInput(direction) {

    switch (direction) {
      case "left":
        this.x -= 100;
        break;
      case "up":
        this.y -= 80;
        break;
      case "right":
        this.x += 100;
        break;
      case "down":
        this.y += 80;
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [enemy1,enemy2,enemy3];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
