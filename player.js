class Player {
  constructor(position, width, height) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = width;
    this.height = height;
    this.isGrounded = false;
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, 100, 100);
  }
  update() {
    this.draw();

    if (
      this.position.y + this.height + this.velocity.y < canvas.height &&
      !this.isGrounded
    ) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
      this.isGrounded = true;
    }
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}
