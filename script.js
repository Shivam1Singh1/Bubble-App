const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Circle properties
const circle = {
  x: 250,
  y: 350,
  r: 110,
  color: getRandomColor()
};

// Arrow properties
const arrow = {
  x: 1050,
  y: 350,
  w: 150,
  h: 20,
  dx: -10,
  moving: false,
  hit: false
};

// Draw circle
function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#222";
  ctx.stroke();
  ctx.closePath();
}

// Draw arrow
function drawArrow() {
  ctx.beginPath();
  ctx.rect(arrow.x, arrow.y - arrow.h / 2, arrow.w, arrow.h);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(arrow.x, arrow.y - 35);
  ctx.lineTo(arrow.x, arrow.y + 35);
  ctx.lineTo(arrow.x - 55, arrow.y);
  ctx.fill();
  ctx.closePath();
}

// Redraw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawArrow();
}

// Generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Arrow movement + collision
function update() {
  if (arrow.moving) {
    arrow.x += arrow.dx;

    // Hit detection
    if (arrow.x <= circle.x + circle.r && arrow.x > -60 && !arrow.hit) {
      arrow.moving = false;
      circle.color = getRandomColor();
      arrow.hit = true;
    }

    // Reset after offscreen
    if (arrow.x < -60) {
      reset();
      arrow.hit = false;
    }
  }

  draw();
  requestAnimationFrame(update);
}

// Reset state
function reset() {
  circle.color = getRandomColor();
  arrow.x = 1050;
  arrow.moving = false;
  arrow.hit = false;
  draw();
}

// Button actions
document.getElementById("hitBtn").addEventListener("click", () => {
  if (!arrow.moving) {
    arrow.moving = true;
  }
});

document.getElementById("resetBtn").addEventListener("click", reset);

// Start game
draw();
update();
