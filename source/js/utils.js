const DEBOUNCE_INTERVAL = 500;

const getRandomInteger = (min, max) => {
  if (max < min) {
    [min, max] = [max, min]
  }
  if (min < 0 || max < 0) {
    return -1;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const debounce = (cb) => {
  let lastTimeout = null;

  return function () {
    const parameters = arguments;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

export {getRandomInteger, debounce}
