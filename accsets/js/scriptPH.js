const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

function Firework(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 3;
  this.speed = 4;
  this.color = "255, 255, 153";
  this.alpha = 1;
  this.explode = false;
  this.particleCount = Math.random() * 50 + 50;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  };

  this.update = function () {
    if (!this.explode) {
      this.y -= this.speed;
      if (this.y < canvas.height / 2.7) {
        this.explode = true;
        createParticles(this.x, this.y, this.particleCount, getRandomColor());
      }
    } else {
      this.alpha -= 0.02;
    }

    this.draw();
  };
}

function Particle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.alpha = 1;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  };

  this.update = function () {
    if (this.alpha <= 0) {
      return;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.01;

    this.draw();
  };
}

function createFirework() {
  fireworks.push(new Firework(canvas.width * Math.random(), canvas.height));
}

function createParticles(x, y, count, color) {
  for (let i = 0; i < count; i++) {
    particles.push(
      new Particle(
        x,
        y,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        Math.random() * 2,
        color
      )
    );
  }
}

function getRandomColor() {
  const colors = [
    "255, 0, 0",
    "0, 255, 0",
    "255, 255, 0",
    "255, 165, 0",
    "0, 0, 255",
    "187, 0, 255",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (frameCount % 30 === 0) {
    createFirework();
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    if (fireworks[i].alpha <= 0) {
      fireworks.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  frameCount++;
}

let frameCount = 0;
animate();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const message = document.getElementById("message");
    message.classList.remove("hidden");
  }, 6000);
});

const envelopeIcon = document.getElementById("envelopeIcon");
const contentDiv = document.getElementById("contentDiv");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("closeIcon");

envelopeIcon.addEventListener("click", () => {
  contentDiv.classList.toggle("hidden");
  overlay.classList.toggle("show");
});

closeIcon.addEventListener("click", () => {
  contentDiv.classList.toggle("hidden");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  contentDiv.classList.toggle("hidden");
  overlay.classList.toggle("show");
});

let datetxtletter =
  "Hôm nay là một ngày đặc biệt, đánh dấu một hành trình tuyệt vời mà bạn đã trải qua. Nhân dịp này, mình xin gửi đến bạn những lời chúc tốt đẹp nhất. Chúc bạn luôn khỏe mạnh, an lành và tràn đầy năng lượng để tiếp tục theo đuổi những ước mơ và hoài bão của mình. Hãy sống thật trọn vẹn, đón nhận mọi điều tốt đẹp và biết trân trọng từng giây phút quý giá trong cuộc sống. Chúc bạn một tuổi mới đầy ắp niềm vui và may mắn!";
let charArrDateLetter = datetxtletter.split("");

document.addEventListener("DOMContentLoaded", () => {
  const textLetter = document.querySelector(".text__letter");

  document.getElementById("envelopeIcon").addEventListener("click", () => {
    setTimeout(() => {
      charArrDateLetter.forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.setProperty("--delay", `${index * 0.05}s`);
        textLetter.appendChild(span);
      });
    }, 2000);
  });
});
