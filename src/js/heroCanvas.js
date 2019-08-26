import preset from './canvasPreset';

const {
  c,
  // ctx,
  r,
  fillArray,
  // updateGroup,
  renderGroup,
  clear,
  draw,
  size,
} = preset();
const particles = [];
const m = { x: 0, y: 0 };

size();
fillArray(21, particles, () => ({
  x: r(0, c.height),
  y: r(0, c.height),
  r: r(1, 2),
  c: '#fff4',
}));

draw(() => {
  clear('#0004');
  renderGroup('arc', particles);
  particles.forEach((object) => {
    const particle = object;
    particle.x -= 0.25 + (c.width / 2 - m.x) / (400 / particle.r);
    particle.y += 1;
    if (particle.x < -particle.r * 2) particle.x = c.width;
    if (particle.x > c.width + particle.r) particle.x = -particle.r * 2;
    if (particle.y > c.height + particle.r) particle.y = -particle.r * 2;
  });
});

window.addEventListener('mousemove', (e) => {
  m.x = e.clientX;
  m.y = e.clientY;
});
