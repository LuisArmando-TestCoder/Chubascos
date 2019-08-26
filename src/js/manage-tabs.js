const tabButtons = document.getElementById('tabs');
const tabItems = document.getElementById('tab-items');

function tabs(button, items) {
  const buttons = [...button.parentElement.children];
  const index = buttons.indexOf(button);
  buttons.forEach((element, i) => {
    element.classList.remove('tab');
    items[i].classList.remove('tab-selected');
  });
  button.classList.add('tab');
  items[index].classList.add('tab-selected');
}

tabs(tabButtons.children[0], tabItems.children);

tabButtons.addEventListener('click', (e) => {
  const tab = e.target;
  if (tab.tagName === 'BUTTON') tabs(tab, tabItems.children);
});
