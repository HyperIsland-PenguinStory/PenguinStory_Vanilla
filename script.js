const loadingScreen = document.getElementById("loadingScreen");
const loadingImage = document.getElementById("loadingImage");
const mainContent = document.getElementById("mainContent");

loadingImage.addEventListener("click", function () {
  // Hide loading screen
  loadingScreen.style.display = "nonee";

  // Show main content
  mainContent.style.display = "block";

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
        y: 0, // y position starts at 0 (top of the window)
        size: Math.random() * 5, // random size
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

  // Run your GSAP animations or any other scripts you need here
  // runAnimations();

  // Testing snoweffect under:

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
  const sections = document.querySelectorAll(".vertical-section");
  let count = 0;
  sections.forEach((section) => {
    const col_left = section.querySelector(".col_left");
    const timeline = gsap.timeline({ paused: true });
    const distance = section.offsetHeight - col_left.offsetHeight;
    timeline.fromTo(col_left, { y: 0 }, { y: distance, ease: "none" }, 0);

    ScrollTrigger.create({
      animation: timeline,
      trigger: section,
      start: "top top",
      end: "bottom center",
      scrub: true,
    });
  });

  // const section_2 = document.getElementById("horizontal");
  // let box_items = gsap.utils.toArray(".horizontal__item");

  // gsap.to(box_items, {
  //   xPercent: -100 * (box_items.length - 1),
  //   ease: "sine.out",
  //   scrollTrigger: {
  //     trigger: section_2,
  //     pin: true,
  //     scrub: 3,
  //     snap: 1 / (box_items.length - 1),
  //     end: "+=" + section_2.offsetWidth,
  //   },
  // });
});
