// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // animation duration in ms
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const count = () => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(target * easeOutQuad(progress));
      counter.textContent = current.toLocaleString();

      if (frame < totalFrames) {
        requestAnimationFrame(count);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    count();
  };

  const easeOutQuad = (t) => t * (2 - t); // easing function

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
});
