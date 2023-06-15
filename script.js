const loadingScreen = document.getElementById("loadingScreen");
const loadingImage = document.getElementById("loadingImage");
const mainContent = document.getElementById("mainContent");
let clickCount = 0;

loadingImage.addEventListener("click", function () {
  clickCount++;

  if (clickCount === 1) {
    loadingImage.src = "Egg2.png";
  } else if (clickCount === 2) {
    loadingImage.src = "Egg3.png";
  } else if (clickCount === 3) {
    loadingImage.src = "Egg6.png";
  }

  if (clickCount <= 3) {
    const audio = new Audio("eggCracking.mp3");
    audio.currentTime = 0; // Reset the playback time to start from the beginning
    audio.playbackRate = 1; // Increase the playback rate to play faster
    audio.play();
  }

  if (clickCount === 4) {
    loadingImage.style.display = "none"; // Hide the image after the last click

    // Hide loading screen
    loadingScreen.style.display = "none";

    // Show main content
    mainContent.style.display = "block";

    const finalAudio = new Audio("PenguinWave.mp3");
    finalAudio.loop = false;
    finalAudio.play();
    scrolltrigger();
  }
});

function init() {
  // Snowfall effect
  let ctx = document.createElement("canvas").getContext("2d");
  document.body.appendChild(ctx.canvas);
  ctx.canvas.style.position = "fixed";
  ctx.canvas.style.top = 0;
  ctx.canvas.style.left = 0;
  ctx.canvas.style.zIndex = -1;

  let particles = [];

  function render() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  function update() {
    while (particles.length < 100) {
      let particle = {
        x: Math.random() * ctx.canvas.width, // x position within the window width
        y: Math.random() * ctx.canvas.height, // y position starts at 0 (top of the window)
        size: Math.random() * 2, // random size
        speedX: Math.random() * 3 - 1, // random speed in the x direction
        speedY: Math.random() * 3, // random speed in the y direction
      };

      particles.push(particle);
    }

    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.y > ctx.canvas.height) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

  function tick() {
    requestAnimationFrame(tick);
    update();
    render();
  }

  tick();

  // Lenis goes here

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Select all sections

  window.addEventListener("resize", scrolltrigger);
}

function scrolltrigger() {
  const sections = document.querySelectorAll(".vertical-section");
  sections.forEach((section) => {
    const col_left = section.querySelector(".col_left");
    const timeline = gsap.timeline({ paused: true });
    const distance = section.offsetHeight - col_left.offsetHeight;
    console.log(distance, section.offsetHeight, col_left.offsetHeight);
    timeline.fromTo(col_left, { y: 0 }, { y: distance, ease: "none" }, 0);

    ScrollTrigger.create({
      animation: timeline,
      trigger: section,
      start: "top top",
      end: "bottom center",
      scrub: true,
    });
  });
}

init();
