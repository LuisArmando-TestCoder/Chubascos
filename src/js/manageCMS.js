import Template from './template';
import callPoems from './callPoems';

function setQueries(body) {
  return Object.keys(body).map(key => `${key}=${body[key]}`).join('&');
}

function setValue(object, value) {
  const item = object;
  item.value = value;
}

(function fetchMethods() {
  Array.prototype.addMultiListeners = function (event, callback) { // eslint-disable-line
    this.forEach((element) => {
      element.addEventListener(event, callback);
    });
  };

  const api = 'https://poems-api.herokuapp.com/v1';
  const poet = document.getElementById('poet');
  const code = document.getElementById('code');
  const selectTitle = document.getElementById('select-title');
  const editedPoem = document.getElementById('edited-poem');
  const createPoem = document.getElementById('create-poem');
  const editPoem = document.getElementById('edit-poem');
  const titleElement = document.getElementById('title');
  const text = document.getElementById('text');
  let poems;

  [poet, code].addMultiListeners('input', () => {
    if (poet.value && code.value) {
      fetch(`${api}/poet?${poet.name}=${poet.value}&${code.name}=${code.value}`)
        .then(data => data.json())
        .then(({
          data,
          success,
        }) => {
          if (success) {
            selectTitle.innerHTML = '';
            poems = data.poems; // eslint-disable-line
            setValue(editedPoem, poems[0].poem);
            data.poems.forEach(({
              title,
            }) => {
              selectTitle.appendChild(new Template(`<option value="${title}">${title}</option>`));
            });
          }
        });
    }
  });

  selectTitle.addEventListener('input', () => {
    if (poems) {
      const optionIndex = [...selectTitle.children].findIndex(child => child.selected);
      setValue(editedPoem, poems[optionIndex].poem);
    }
  });

  createPoem.addEventListener('click', (e) => {
    e.preventDefault();
    const body = setQueries({
      name: poet.value,
      code: code.value,
      title: titleElement.value,
      poem: text.value,
    });

    fetch(`${api}/poem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        if (data && data.ok) callPoems();
      });

    poems.push({
      title: body.title,
      poem: body.poem,
    });
  });

  editPoem.addEventListener('click', (e) => {
    e.preventDefault();
    const body = setQueries({
      name: poet.value,
      code: code.value,
      title: selectTitle.value,
      poem: editedPoem.value,
    });

    fetch(`${api}/poem`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((data) => {
        if (data && data.ok) callPoems();
      });
  });
}());
