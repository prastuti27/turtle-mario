class Enemy {
  constructor(position, velocity, distance, width, height) {
    this.position = position;
    this.velocity = velocity;
    this.distance = distance;
    this.width = width;
    this.height = height;
    this.initialPosition = position.x;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    if (Math.abs(this.position.x - this.initialPosition) >= this.distance) {
      this.velocity.x *= -1;
    }

    this.position.x += this.velocity.x;
  }
}
