// variables
var score = 0;
level = 0;
life = 5;

var hearts = document.querySelectorAll(".heart");

// Enemies our player must avoid
var Enemy = function(x, y, v) {
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
  this.x += this.v * dt;
  if (this.x > 460) this.x = -10;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy(-120, 60, 200);
var enemy2 = new Enemy(-120, 140, 300);
var enemy3 = new Enemy(-120, 220, 500);

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

var allEnemies = [enemy1, enemy2, enemy3];

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

// collision detection
// We go through an array and for ech element we check the difference distance between the player and the enemy
// if they are enough close (inside the range) the player is dead.
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    var diffX = Math.abs(enemy.x - player.x);
    var diffY = Math.abs(enemy.y - player.y);
    if (diffX <= 75 && diffY === 0) {
      youAreDead();
    }
  });
}

// we set up again the player to initial position
function backToStart() {
  player.x = 200;
  player.y = 300;
}

//If our Player is dead you lose one scored and one hearts
//if you lose all your hearts the game start again from the beginning
function youAreDead() {
  score -= 1;
  var hearts = document.querySelectorAll(".heart");
  hearts[5 - life].classList.add("hidden");
  life--;
  backToStart();
  if (life === 0) {
    gameOver();
  }
}

// if your Player reach the water you get one point and then you restart from the initial position
function point() {
  if (player.y === -20) {
    score += 1;
    backToStart();
  }
}

// You have five life everytime you crash with one bug one heart is hidden from the css (that mean you lost it)
function gameOver() {
  life = 5;
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].classList.remove("hidden");
  }
}
