import Template from './template';

const elements = [
  document.getElementById('home-title'),
];

function spanify(element) {
  const attr = 'route="poems" class="spanified"';
  return `<span ${attr}>${element.innerText.split('').join(`</span><span ${attr}>`)}</span>`;
}

elements.forEach((element) => {
  element.appendChild(new Template(`<span>${spanify(element)}</span>`));
  element.childNodes[0].remove();
});
