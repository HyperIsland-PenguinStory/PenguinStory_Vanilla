const loadingScreen = document.getElementById("loadingScreen");
const loadingImage = document.getElementById("loadingImage");
const mainContent = document.getElementById("mainContent");

loadingImage.addEventListener("click", function () {
  // Hide loading screen
  loadingScreen.style.display = "none";

  // Show main content
  mainContent.style.display = "block";

  // Run your GSAP animations or any other scripts you need here
  // runAnimations();

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

  sections.forEach((section) => {
    const col_left = section.querySelector(".col_left");
    const timeline = gsap.timeline({ paused: true });

    timeline.fromTo(
      col_left,
      { y: 0 },
      { y: "150vh", duration: 1, ease: "none" },
      0
    );

    ScrollTrigger.create({
      animation: timeline,
      trigger: section,
      start: "top top",
      end: "bottom center",
      scrub: true,
    });
  });

  const section_2 = document.getElementById("horizontal");
  let box_items = gsap.utils.toArray(".horizontal__item");

  gsap.to(box_items, {
    xPercent: -100 * (box_items.length - 1),
    ease: "sine.out",
    scrollTrigger: {
      trigger: section_2,
      pin: true,
      scrub: 3,
      snap: 1 / (box_items.length - 1),
      end: "+=" + section_2.offsetWidth,
    },
  });
});
