// import utils from './canvasPreset';
import renderPickedPoems from './renderPickedPoems';
import pickPoems from './pickPoems';
// import fadeText from './fadeText';
import fetchPoems from './fetchPoems';

const loader = document.getElementById('loader');
// const fadeTextElement = document.getElementById('fade-text');

function loadOut(loaderElement) {
  if (!loaderElement.classList.contains('fade-away')) {
    loaderElement.classList.add('fade-away');
    loaderElement.addEventListener('animationend', () => {
      loaderElement.remove();
    });
  }
}

function callPoems() {
  fetchPoems(({ data }) => {
    // let randomPoem = data[utils().r(0, data.length - 1)];
    // const poet = randomPoem.name;
    // randomPoem = randomPoem.poems[utils().r(0, randomPoem.poems.length - 1)];

    loadOut(loader);
    renderPickedPoems(pickPoems(data), data);
    // fadeText(fadeTextElement, randomPoem.poem);
  });
}

export default callPoems;
