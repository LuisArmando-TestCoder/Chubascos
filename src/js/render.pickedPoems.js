import Template from './template';

const showPoemTitle = document.getElementById('show-poem-title');
const showPoem = document.getElementById('show-poem');
const showAuthor = document.getElementById('show-author');
const poemTitle = document.getElementById('poem-title');
const poemElement = document.getElementById('poem');
const previousArrow = document.getElementById('previous-arrow');
const nextArrow = document.getElementById('next-arrow');
const currentPoemNumber = document.getElementById('current-poem-number');
const poemsCountNumber = document.getElementById('poems-count-number');
const searchPoem = document.getElementById('search-poem');

let currentPoemsIndex = 0;

function changePoem(poems, index) {
  const { name, title, poem } = poems[index];

  currentPoemNumber.innerText = index + 1;
  poemsCountNumber.innerText = poems.length;
  showPoemTitle.innerText = title;
  showPoem.innerText = poem;
  showAuthor.innerText = name;
}

function controlPoemsNav(poems) {
  const sortedPoems = poems.sort((a, b) => a.index - b.index);

  previousArrow.addEventListener('click', () => {
    currentPoemsIndex -= 1;
    if (currentPoemsIndex < 0) currentPoemsIndex = poems.length - 1;
    changePoem(sortedPoems, currentPoemsIndex);
  });
  nextArrow.addEventListener('click', () => {
    currentPoemsIndex += 1;
    if (currentPoemsIndex > poems.length - 1) currentPoemsIndex = 0;
    changePoem(sortedPoems, currentPoemsIndex);
  });
}

function focusPoem(item, poems) {
  const index = +item.getAttribute('index');

  currentPoemsIndex = poems[index].index + 1;
  currentPoemNumber.innerText = poems[index].index + 1;
  poemsCountNumber.innerText = poems.length;
  currentPoemsIndex = poems[index].index;
  showPoemTitle.innerText = poems[index].title;
  showPoem.innerText = poems[index].poem;
  poemTitle.innerText = poems[index].title;
  poemElement.innerText = poems[index].poem;

  item.focus();
}

function listenPoemsHover(parent, poems) {
  let item;

  poemsCountNumber.innerText = poems.length;

  searchPoem.addEventListener('input', () => {
    const itemNames = [...document.querySelectorAll('[item-name]')];
    const poemsHide = [...document.getElementsByClassName('poem-hide')];

    if (poemsHide) poemsHide.forEach(poemHide => poemHide.classList.remove('poem-hide'));

    itemNames.forEach((itemName) => {
      const name = itemName.getAttribute('item-name');
      if (name.toLowerCase().indexOf(searchPoem.value.toLowerCase()) < 0) {
        itemName.classList.add('poem-hide');
      }
    });
  });

  focusPoem(document.querySelector('.poem-item'), poems);

  parent.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('poem-item') && item !== e.target) {
      item = e.target;
      focusPoem(item, poems);
    }
  });
}


function renderPickedPoems(poems, data) {
  const poemsList = document.getElementById('poems-list');
  poems.forEach(({ name, title, index }) => {
    poemsList.appendChild(new Template(`
    <li item-name="${title}">
      <button route="poem-section" index="${index}" class="poem-item">
        <p class="poem-details">
          <b>${title}</b>
          <i>${name}</i>
        </p>
      </button>
    </li>
    `));
  });

  listenPoemsHover(poemsList, poems);
  controlPoemsNav(poems, data);
}

export default renderPickedPoems;
