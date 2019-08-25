import utils from './canvasPreset';

function flushArray(array) {
  const arrayCopy = [].concat(array);
  const flushedArray = [];
  while (arrayCopy.length) {
    flushedArray.push(arrayCopy.splice(utils().r(0, arrayCopy.length - 1), 1)[0]);
  }
  return flushedArray;
}

function pickPoems(poets) {
  const poetsCopy = [].concat(poets);
  const pickedPoems = [];
  poetsCopy.forEach(({ name, poems }) => {
    poems = poems.map((poem, i) => Object.assign(poem, { index: i })); // eslint-disable-line
    while (poems.length) { // meanwhile poems.length != falsy
      const { title, poem, index } = poems.splice(utils().r(0, poems.length - 1), 1)[0];
      pickedPoems.push({
        name,
        title,
        poem,
        index,
      });
    }
  });
  return flushArray(pickedPoems);
}

export default pickPoems;
