const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = new Player(
  {
    x: 100,
    y: 0,
  },
  50,
  100
);

const objectMapping = {
  middleBlock: 1,
  rightEdgeBlock: 2,

  middleEdgePlatform: 3,
  rightEdgePlatform: 4,
  leftEdgePlatform: 5,
};

let blocks = [];
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
    }
  });
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blocks.forEach((block) => {
    block.draw(ctx);
    // const collisionDetected = detectCollision(player, block);
    // if (collisionDetected) {
    //   console.log("Collision detected!");
    // } else {
    //   console.log("No collision.");
    // }
  });
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i]) {
      if (detectCollision(player, blocks[i])) {
        // if (player.velocity.y > 0) {
        // console.log(player.height);
        player.position.y = blocks[i].position.y - player.height;
        player.isGrounded = true;
        break;
        // }
      } else {
        player.isGrounded = false;
      }
    }
  }

  // player.draw();

  // console.log(block);

  player.velocity.x = 0;
  if (keys.ArrowLeft) {
    player.velocity.x = -5;
  } else if (keys.ArrowRight) {
    player.velocity.x = 5;
  }
  if (keys.ArrowUp) {
    if (player.isGrounded) {
      player.velocity.y = -10;
      player.isGrounded = false;
    }
  }
  player.update();
}
animate();
