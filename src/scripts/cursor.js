

const canvasMouse = document.getElementById("mouse");
const ctxMouse = canvasMouse.getContext("2d");

// Настройка размера canvasMouse
function resizecanvasMouse() {
  canvasMouse.width = window.innerWidth;
  canvasMouse.height = window.innerHeight;
}
resizecanvasMouse();
window.addEventListener("resize", resizecanvasMouse);

// Параметры следа
const trail = {
  points: [],
  maxLength: 30, // Увеличенная длина
  baseThickness: 12, // Значительно толще
  color: "#131313", // Ярче и менее прозрачный
  lastX: 0,
  lastY: 0,
  velocity: 0,
  minVelocity: 0.05, // Более чувствительный порог остановки
  smoothPoints: [],
  shrinkProgress: 0,
  mouseSmoothX: 0, // Для плавного слежения
  mouseSmoothY: 0,
};

// Следим за мышью
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let lastTime = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Плавное движение курсора
function smoothMousePosition() {
  trail.mouseSmoothX += (mouseX - trail.mouseSmoothX) * 0.2;
  trail.mouseSmoothY += (mouseY - trail.mouseSmoothY) * 0.2;
  return { x: trail.mouseSmoothX, y: trail.mouseSmoothY };
}

// Обновление следа
function updateTrail(timestamp) {
  const timeDelta = timestamp - lastTime || 16;
  lastTime = timestamp;

  const smoothMouse = smoothMousePosition();
  trail.velocity = calculateVelocity(
    smoothMouse.x,
    smoothMouse.y,
    lastMouseX,
    lastMouseY,
    timeDelta
  );
  lastMouseX = smoothMouse.x;
  lastMouseY = smoothMouse.y;

  // Добавляем новую точку с временной меткой
  trail.points.unshift({
    x: smoothMouse.x,
    y: smoothMouse.y,
    time: timestamp,
  });

  // Удаляем старые точки
  if (trail.points.length > trail.maxLength) {
    trail.points.pop();
  }

  // Плавное подтягивание при остановке
  trail.shrinkProgress =
    trail.velocity < trail.minVelocity
      ? Math.min(1, trail.shrinkProgress + 0.03)
      : Math.max(0, trail.shrinkProgress - 0.1);

  // Сглаживание точек с учетом подтягивания
  trail.smoothPoints = superSmoothPoints(
    trail.shrinkProgress > 0
      ? applyShrinkEffect(
          trail.points,
          smoothMouse.x,
          smoothMouse.y,
          trail.shrinkProgress
        )
      : trail.points
  );
}

// Супер-сглаживание
function superSmoothPoints(points) {
  if (points.length < 3) return points;

  const smoothed = [];
  for (let i = 0; i < points.length; i++) {
    const p0 = points[Math.max(0, i - 2)];
    const p1 = points[Math.max(0, i - 1)];
    const p2 = points[i];
    const p3 = points[Math.min(points.length - 1, i + 1)];
    const p4 = points[Math.min(points.length - 1, i + 2)];

    // Катмулл-Ром сплайн для идеальной плавности
    smoothed.push({
      x: (p0.x + p1.x * 4 + p2.x * 6 + p3.x * 4 + p4.x) / 16,
      y: (p0.y + p1.y * 4 + p2.y * 6 + p3.y * 4 + p4.y) / 16,
    });
  }
  return smoothed;
}

// Эффект подтягивания
function applyShrinkEffect(points, targetX, targetY, amount) {
  return points.map((p, i) => {
    const progress = i / points.length;
    const factor = amount * (1 - progress * progress); // Квадратичное уменьшение
    return {
      x: targetX + (p.x - targetX) * (1 - factor),
      y: targetY + (p.y - targetY) * (1 - factor),
      time: p.time,
    };
  });
}

// Отрисовка следа
function drawTrail() {
  ctxMouse.clearRect(0, 0, canvasMouse.width, canvasMouse.height);

 
  if (trail.shrinkProgress > 0.95) {
    const circleSize =
      (trail.baseThickness / 2) * (0.5 + trail.shrinkProgress * 0.5);
    ctxMouse.beginPath();
    ctxMouse.arc(
      trail.mouseSmoothX,
      trail.mouseSmoothY,
      circleSize,
      0,
      Math.PI * 2
    );
    ctxMouse.fillStyle = trail.color;
    ctxMouse.fill();
    return;
  }


  if (trail.smoothPoints.length < 2) return;

  ctxMouse.beginPath();
  ctxMouse.moveTo(trail.smoothPoints[0].x, trail.smoothPoints[0].y);

  for (let i = 1; i < trail.smoothPoints.length; i++) {
    const p = trail.smoothPoints[i];
    const prevP = trail.smoothPoints[i - 1];

   
    const progress = i / trail.smoothPoints.length;
    const thickness = trail.baseThickness * (1 - Math.pow(progress, 3)); // Кубическое уменьшение
    const pointiness = 1 - Math.pow(progress, 1.8);

    
    const cp1x = prevP.x + (p.x - prevP.x) * 0.2 * pointiness;
    const cp1y = prevP.y + (p.y - prevP.y) * 0.2 * pointiness;
    const cp2x = prevP.x + (p.x - prevP.x) * 0.8 * pointiness;
    const cp2y = prevP.y + (p.y - prevP.y) * 0.8 * pointiness;

    ctxMouse.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p.x, p.y);
    ctxMouse.lineWidth = thickness;
    ctxMouse.strokeStyle = trail.color;
    ctxMouse.lineCap = "round";
    ctxMouse.lineJoin = "round";
    ctxMouse.stroke();

   
    ctxMouse.beginPath();
    ctxMouse.moveTo(p.x, p.y);
  }

 
  if (trail.shrinkProgress > 0) {
    const circleSize = (trail.baseThickness / 2) * trail.shrinkProgress;
    ctxMouse.beginPath();
    ctxMouse.arc(
      trail.mouseSmoothX,
      trail.mouseSmoothY,
      circleSize,
      0,
      Math.PI * 2
    );
    ctxMouse.fillStyle = trail.color;
    ctxMouse.fill();
  }
}


function animate(timestamp) {
  updateTrail(timestamp);
  drawTrail();
  requestAnimationFrame(animate);
}


function calculateVelocity(x, y, lastX, lastY, dt) {
  return dt
    ? (Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)) / dt) * 1000
    : 0;
}


requestAnimationFrame(animate);