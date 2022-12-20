const background = document.querySelector(".bg");
const timer = document.querySelector(".timer");
let value = Number(window.getComputedStyle(background).filter.slice(5, -3));
let interval;
let intervalCount;
let count = 0;

function reduceBlur() {
  value = value - 0.5;
  background.style.filter = `blur(${value}px)`;
}
function increaseCount() {
  if (count != 100) {
    timer.textContent = `${count + 1}%`;
    count = Number(timer.textContent.slice(0, -1));
  }
}

intervalCount = setInterval(increaseCount, 29.1);
interval = setInterval(reduceBlur, 100);

const observer = new MutationObserver((mutations) => {
  mutations.every((mutation) => {
    if (mutation.target.style.filter === "blur(0px)") {
      timer.style.opacity = "0";
      clearInterval(intervalCount);
      clearInterval(interval);
    }
  });
});

observer.observe(background, { attributes: true });
