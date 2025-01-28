document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll(".scroll-counter");

  elements.forEach(function(item) {
    item.counterAlreadyFired = false;
    item.counterSpeed = item.getAttribute("data-counter-time") / 45;
    item.counterTarget = +item.innerText;
    item.counterCount = 0;
    item.counterStep = item.counterTarget / item.counterSpeed;

    item.updateCounter = function() {
      item.counterCount = item.counterCount + item.counterStep;
      item.innerText = Math.ceil(item.counterCount);

      if (item.counterCount < item.counterTarget) {
        setTimeout(item.updateCounter, item.counterSpeed);
      } else {
        item.innerText = item.counterTarget;
      }
    };
  });

  function isElementVisible(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    elements.forEach(function(item) {
      if (item.counterAlreadyFired || !isElementVisible(item)) return;
      item.updateCounter();
      item.counterAlreadyFired = true;
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
