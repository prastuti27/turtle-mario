const canvas = document.getElementById("canvas");
let score = 0;
let gems = 0;
let life = 3;

const highScore = localStorage.getItem("highScore") || 0;
console.log("High Score:", highScore);

const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "./assets/bgimg1.png";
let backgroundImageX = 0;

const player = new Player(
  {
    x: 100,
    y: 0,
  },
  50,
  100
);
const enemy = new Enemy({ x: 300, y: 100 }, { x: 2, y: 1 }, 50, 50, 100);

const objectMapping = {
  middleBlock: 1,
  rightEdgeBlock: 2,

  middleEdgePlatform: 3,
  rightEdgePlatform: 4,
  leftEdgePlatform: 5,
  leftDoor: 8,
  rightDoor: 9,
  coins: 6,
  gems: 7,
  life: 12,

  leftEdgeDoor: 10,
  rightEdgeDoor: 11,
};

let blocks = [];
let collectcoins = [];
let collectgems = [];
let collectlife = [];

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case objectMapping.middleBlock:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "green",
            coordinates: {
              x: 61,
              y: 26,
              width: 33,
              height: 30,
            },
          })
        );
        break;
      case objectMapping.rightEdgeBlock:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "green",
            coordinates: {
              x: 100,
              y: 26,
              width: 35,
              height: 30,
            },
          })
        );
        break;
      case objectMapping.middleEdgePlatform:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "blue",
            coordinates: {
              x: 106,
              y: 156,
              width: 34,
              height: 18,
            },
          })
        );
        break;
      case objectMapping.rightEdgePlatform:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "blue",
            coordinates: {
              x: 146,
              y: 156,
              width: 33,
              height: 18,
            },
          })
        );
        break;
      case objectMapping.leftEdgePlatform:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "blue",
            coordinates: {
              x: 183,
              y: 156,
              width: 34,
              height: 18,
            },
          })
        );
        break;
      case objectMapping.coins:
        collectcoins.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "yellow",
            coordinates: {
              x: 23,
              y: 144,
              width: 25,
              height: 29,
            },
          })
        );
        break;
      case objectMapping.gems:
        collectgems.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "yellow",
            coordinates: {
              x: 23,
              y: 178,
              width: 26,
              height: 31,
            },
          })
        );
        break;
      case objectMapping.leftDoor:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "yellow",
            coordinates: {
              x: 278,
              y: 25,
              width: 26,
              height: 34,
            },
          })
        );
        break;
      case objectMapping.rightDoor:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "yellow",
            coordinates: {
              x: 315,
              y: 27,
              width: 26,
              height: 30,
            },
          })
        );
        break;
      case objectMapping.leftEdgeDoor:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "yellow",
            coordinates: {
              x: 240,
              y: 25,
              width: 34,
              height: 34,
            },
          })
        );
        break;
      case objectMapping.rightEdgeDoor:
        blocks.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "yellow",
            coordinates: {
              x: 352,
              y: 25,
              width: 33,
              height: 34,
            },
          })
        );
        break;
      case objectMapping.life:
        collectlife.push(
          new Block({
            position: {
              x: 40 * j,
              y: 40 * i,
            },
            color: "red",
            coordinates: {
              x: 23,
              y: 218,
              width: 24,
              height: 22,
            },
          })
        );
        break;
    }
  });
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    backgroundImageX,
    0,
    canvas.width,
    canvas.height
  );

  blocks.forEach((block) => {
    block.draw(ctx);

    // const collisionDetected = detectCollision(player, block);
    // if (collisionDetected) {
    //   console.log("Collision detected!");
    // } else {
    //   console.log("No collision.");
    // }
  });
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 20, 30);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Gems: " + gems, 20, 50);
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Life: " + life, 150, 30);

  collectcoins.forEach((block) => {
    block.draw(ctx);
  });
  collectgems.forEach((block) => {
    block.draw(ctx);
  });
  collectlife.forEach((block) => {
    block.draw(ctx);
  });
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i]) {
      if (detectCollision(player, blocks[i])) {
        const overlapX =
          player.position.x +
          player.width / 2 -
          blocks[i].position.x -
          blocks[i].width / 2;
        const overlapY =
          player.position.y +
          player.height / 2 -
          blocks[i].position.y -
          blocks[i].height / 2;

        const combinedHalfWidths = player.width / 2 + blocks[i].width / 2;
        const combinedHalfHeights = player.height / 2 + blocks[i].height / 2;

        if (
          Math.abs(overlapX) < combinedHalfWidths &&
          Math.abs(overlapY) < combinedHalfHeights
        ) {
          const overlapWidth = combinedHalfWidths - Math.abs(overlapX);
          const overlapHeight = combinedHalfHeights - Math.abs(overlapY);

          if (overlapWidth >= overlapHeight) {
            // player.isGrounded = true;
            if (overlapY > 0) {
              player.position.y += overlapHeight;
              player.velocity.y = 0;
              if (player.velocity.y >= 0) {
                // Check if the player is moving downwards
                player.isGrounded = true; // Set player as grounded on collision with top of block
              }
            } else {
              player.position.y -= overlapHeight;
              player.velocity.y = 0;
              // player.isGrounded = true;
            }
          } else {
            if (overlapX > 0) {
              player.position.x += overlapWidth;
            } else {
              player.position.x -= overlapWidth;
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < collectcoins.length; i++) {
    if (collectcoins[i]) {
      if (detectCoinCollision(player, collectcoins[i])) {
        collectcoins = collectcoins.filter(
          (collectcoin) => collectcoin != collectcoins[i]
        );
        score += 10;
      }
    }
  }
  for (let i = 0; i < collectgems.length; i++) {
    if (collectgems[i]) {
      if (detectCoinCollision(player, collectgems[i])) {
        collectgems = collectgems.filter(
          (collectgem) => collectgem != collectgems[i]
        );
        gems++;
      }
    }
  }
  for (let i = 0; i < collectlife.length; i++) {
    if (collectlife[i]) {
      if (detectCoinCollision(player, collectlife[i])) {
        collectlife = collectlife.filter(
          (collectlif) => collectlif != collectlife[i]
        );
        life++;
        console.log(life);
      }
    }
  }

  if (detectCoinCollision(player, enemy)) {
    life -= 1;
  }

  player.velocity.x = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i]) {
      if (keys.ArrowLeft && player.position.x > 0) {
        player.velocity.x = -5;
      } else if (keys.ArrowRight && player.position.x < canvas.width / 2) {
        player.velocity.x = 5;
      } else {
        player.velocity.x = 0;
        if (keys.ArrowLeft) {
          blocks[i].position.x += 5;
        } else if (keys.ArrowRight) {
          blocks[i].position.x -= 5;
        }
      }
    }
  }

  for (let i = 0; i < collectcoins.length; i++) {
    if (collectcoins[i]) {
      if (keys.ArrowLeft && player.position.x > 0) {
        player.velocity.x = -5;
      } else if (keys.ArrowRight && player.position.x < canvas.width / 2) {
        player.velocity.x = 5;
      } else {
        player.velocity.x = 0;
        if (keys.ArrowLeft) {
          collectcoins[i].position.x += 5;
        } else if (keys.ArrowRight) {
          collectcoins[i].position.x -= 5;
        }
      }
    }
  }
  for (let i = 0; i < collectgems.length; i++) {
    if (collectgems[i]) {
      if (keys.ArrowLeft && player.position.x > 0) {
        player.velocity.x = -5;
      } else if (keys.ArrowRight && player.position.x < canvas.width / 2) {
        player.velocity.x = 5;
      } else {
        player.velocity.x = 0;
        if (keys.ArrowLeft) {
          collectgems[i].position.x += 5;
        } else if (keys.ArrowRight) {
          collectgems[i].position.x -= 5;
        }
      }
    }
  }
  if (keys.ArrowUp) {
    // if (player.isGrounded) {
    player.velocity.y = -8;
    player.velocity.y += gravity;
    player.isGrounded = false;

    // }
    // else {
    //   player.velocity.y = 0;
    //   if (keys.ArrowUp) {
    //     blocks[i].position.y += 10;
    //   }
    // }
  }
  // if (keys.ArrowDown) {
  //   player.isGrounded = true;
  // }
  enemy.update();
  player.update();
  // At the end of the game loop or when the game ends and a new high score is achieved
  if (score > localStorage.getItem("highScore")) {
    localStorage.setItem("highScore", score);
  }
}
animate();
