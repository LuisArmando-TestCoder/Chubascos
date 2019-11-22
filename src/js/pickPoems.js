function pickPoems(poets) {
  const poetsCopy = [].concat(poets);
  const pickedPoems = [];
  poetsCopy.forEach(({ name, poems }) => {
    poems = poems.map((poem, i) => Object.assign(poem, { index: i })); // eslint-disable-line
    while (poems.length) { // meanwhile poems.length != falsy
      const { title, poem, index } = poems.splice(poems.length - 1, 1)[0];
      pickedPoems.push({
        name,
        title,
        poem,
        index,
      });
    }
  });
  return pickedPoems;
}

export default pickPoems;
