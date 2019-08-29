function fetchPoems(callback) {
  fetch('https://poems-api.herokuapp.com/v1/all-poets')
    .then(data => data.json())
    .then((json) => {
      if (callback) callback(json);
    });
}

module.exports = fetchPoems;
