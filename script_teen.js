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

const section_2 = document.getElementById("vertical2");
const col_left2 = document.querySelector(".col_left2");
const timeln = gsap.timeline({ paused: true });

timeln.fromTo(
  col_left2,
  { y: "170vh" },
  { y: "340vh", duration: 1, ease: "none" },
  0
);

const scroll_1 = ScrollTrigger.create({
  animation: timeln,
  trigger: section_2,
  start: "top top",
  end: "bottom center",
  scrub: true,
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
