const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
const prev   = document.getElementById('prev');
const next   = document.getElementById('next');

let current = 0;
let locked  = false;

slides[0].classList.add('visible');

function goTo(index) {
  if (locked) return;
  locked = true;

  const outSlide  = slides[current];
  const nextIndex = (index + slides.length) % slides.length;
  const inSlide   = slides[nextIndex];
  const goingLeft = nextIndex < current && !(current === slides.length - 1 && nextIndex === 0);
  const wrappingForward = current === slides.length - 1 && nextIndex === 0;
  const fromLeft  = goingLeft && !wrappingForward;

  outSlide.classList.remove('visible');

  setTimeout(() => {
    outSlide.classList.remove('active');
    current = nextIndex;

    inSlide.classList.add('active');
    inSlide.classList.toggle('slide-from-left', fromLeft);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      inSlide.classList.add('visible');
    }));

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    setTimeout(() => {
      inSlide.classList.remove('slide-from-left');
      locked = false;
    }, 450);
  }, 280);
}

prev.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.index))));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});
