function presetCanvas() {
  const c = document.querySelector('canvas');
  const ctx = c.getContext('2d');

  const size = function size(w = window.innerWidth, h = window.innerHeight) {
    c.width = w;
    c.height = h;
    if (c.width === window.innerWidth) {
      window.addEventListener('resize', () => {
        c.width = window.innerWidth;
      });
    }
    if (c.height === window.innerHeight) {
      window.addEventListener('resize', () => {
        c.height = window.innerHeight;
      });
    }
  };

  const clear = function clear(color) {
    if (!color) {
      ctx.clearRect(0, 0, c.width, c.height);
    } else if (typeof color === 'string') {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, c.width, c.height);
    }
  };

  const draw = function (f) { // eslint-disable-line
    if (typeof f === 'function') f();
    requestAnimationFrame(() => draw(f));
  };

  const render = function render(vertex) {
    return {
      rect() {
        ctx.beginPath();
        ctx.save();
        ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
        ctx.rotate(vertex.rot);
        ctx.fillStyle = vertex.c;
        ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
        ctx.restore();
      },
      arc() {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = vertex.c;
      },
      img() {
        ctx.save();
        ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
        ctx.rotate(vertex.rot);
        if (vertex.img.complete) {
          ctx.drawImage(vertex.img, -vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
        } else {
          ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
        }
        ctx.fillStyle = vertex.c;
        ctx.restore();
      },
      txt() {
        ctx.beginPath();
        ctx.fillStyle = vertex.c;
        ctx.font = vertex.font;
        ctx.fillText(vertex.txt, vertex.x, vertex.y);
      },
    };
  };

  const renderGroup = function renderGroup(type, array) {
    array.forEach((obj) => {
      render(obj)[type]();
    });
  };

  const updateGroup = function updateGroup(array, f) {
    array.forEach(obj => f(obj));
  };

  const r = function r(min, max) {
    return Math.ceil(Math.random() * ((max + 1) - min) + min) - 1;
  };

  const fetchJSON = function fetchJSON(url, func) {
    fetch(url)
      .then(res => res.json())
      .then(json => func(json));
  };

  const calculateDistance = function calculateDistance(obj1, obj2) {
    const x = obj2.x - obj1.x;
    const y = obj2.y - obj1.y;
    const distance = Math.sqrt(x ** 2 + y ** 2); // eslint-disable-line
    return distance;
  };

  const fillArray = function fillArray(times, array, f) {
    for (let i = 0; i < times; i += 1) {
      array.push(f(i));
    }
  };

  // variable = analyseAudio(audio) --> after user triggering (click or alike)
  // variable.getFrequency().array --> inside a framelooper function
  const analyseAudio = function analyseAudio(audio) {
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    let audioArray;
    source.connect(analyser);
    analyser.connect(context.destination);

    function getAverage(array) {
      return array.reduce((a, b) => a + b) / array.length;
    }

    function getFrequency() {
      audioArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(audioArray);
      return {
        array: audioArray,
        average: getAverage(audioArray),
      };
    }

    function getAmplitude() {
      audioArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(audioArray);
      return {
        array: audioArray,
        average: getAverage(audioArray),
      };
    }
    return {
      getFrequency,
      getAmplitude,
    };
  };

  return {
    draw,
    c,
    ctx,
    r,
    fetchJSON,
    calculateDistance,
    fillArray,
    analyseAudio,
    updateGroup,
    renderGroup,
    clear,
    size,
  };
}

export default presetCanvas;
