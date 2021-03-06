import Template from './template';

function fadeText(element, text) {
  const textTemplate = `${text.substr(0, 350)}...`.split(' ').map((char, i) => `
  <span 
    class="fade-word" 
    style="animation-delay: ${i / 5}s;">
      ${char}
  </span>`).join(' ');

  element.appendChild(new Template(`<div>${textTemplate}</div>`));
}

export default fadeText;
