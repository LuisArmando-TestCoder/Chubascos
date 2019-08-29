import Template from './template';
import callPoems from './callPoems';

const wrapRotors = document.querySelectorAll('[wrap-amount]');

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

setRotors(wrapRotors[0], '<div class="rotor"></div>', '<div class="grand-rotor"></div>');

callPoems();
