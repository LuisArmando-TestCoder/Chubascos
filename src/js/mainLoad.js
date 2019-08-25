import Template from './template';
import fetchAll from './fetchAll';
import pickPoems from './pickPoems';
import renderPickedPoems from './render.pickedPoems';

const wrapRotors = document.querySelectorAll('[wrap-amount]');
const loader = document.getElementById('loader');

function setRotors(element, templateParent, templateGrandParent) {
  const rotorsAmount = +element.getAttribute('wrap-amount');
  const template = new Template(templateParent);
  const definedParent = template;
  const grandParent = new Template(templateGrandParent);
  let parent = definedParent;

  for (let i = 0; i < rotorsAmount; i += 1) {
    const rotor = template.cloneNode();
    parent.appendChild(rotor);
    parent = rotor;
  }

  parent.appendChild(new Template(element.outerHTML));
  grandParent.appendChild(definedParent);
  element.replaceWith(grandParent);

  return grandParent;
}

function loadOut(loaderElement) {
  if (!loaderElement.classList.contains('fade-away')) {
    loaderElement.classList.add('fade-away');
    loaderElement.addEventListener('animationend', () => {
      loaderElement.remove();
    });
  }
}

setRotors(wrapRotors[0], '<div class="rotor"></div>', '<div class="grand-rotor"></div>');

fetchAll((json) => {
  loadOut(loader);
  renderPickedPoems(pickPoems(json.data), json.data);
});
