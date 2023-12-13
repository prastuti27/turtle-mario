function detectCollision(a, b) {
  return (
    // a.position.y + a.height >= b.position.y && // Player's bottom edge > Block's top edge
    // a.position.y <= b.position.y + b.height //
    a.position.x <= b.position.x + b.width &&
    a.position.x + a.width >= b.position.x &&
    a.position.y <= b.position.y &&
    a.position.y + a.height >= b.position.y
  );
}
function detectCoinCollision(a, b) {
  return (
    // a.position.y + a.height >= b.position.y && // Player's bottom edge > Block's top edge
    // a.position.y <= b.position.y + b.height //
    a.position.x <= b.position.x + b.width &&
    a.position.x + a.width >= b.position.x &&
    a.position.y <= b.position.y + b.height &&
    a.position.y + a.height >= b.position.y
  );
}
