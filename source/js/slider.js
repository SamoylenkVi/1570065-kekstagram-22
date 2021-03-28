/* global noUiSlider:readonly */

const SpecialStyle = {
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  NONE: 'none',
}
const SliderSettings = {
  NONE:
  {
    class: 'effects__preview--mone',
    min: 0,
    max: 0.1,
    start: 0,
    step: 0,
    effect: 'none',
  },
  CHROME:
  {
    class: 'effects__preview--chrome',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    effect: 'grayscale',
  },
  SEPIA:
  {
    class: 'effects__preview--sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    effect: 'sepia',
  },
  MARVIN:
  {
    class: 'effects__preview--marvin',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    effect: 'invert',
  },
  PHOBOS:
  {
    class: 'effects__preview--phobos',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    effect: 'blur',
  },
  HEAT:
  {
    class: 'effects__preview--heat',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    effect: 'brightness',
  },
}

const formEditingPicture = document.querySelector('.img-upload__form');
const sliderContainer = formEditingPicture.querySelector('.effect-level__slider');
const sliderValue = formEditingPicture.querySelector('.effect-level__value');
const sliderEffect = formEditingPicture.querySelector('.img-upload__preview');
const effectsList = formEditingPicture.querySelector('.effects__list');



noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const setSliderDefaultSettings = () => {
  const slider = document.querySelector('.noUi-base');
  slider.style.display = 'none';
  sliderEffect.classList.add(SliderSettings.NONE.class);
  sliderEffect.style.filter = SpecialStyle.NONE;
}

setSliderDefaultSettings();

const onEffectsListChange = (evt) => {

  sliderEffect.classList.remove(sliderEffect.classList[1]);

  const slider = document.querySelector('.noUi-base');

  const sliderSetting = SliderSettings[evt.target.value.toUpperCase()];

  sliderEffect.classList.add(sliderSetting.class);

  if (evt.target.value === SpecialStyle.NONE) {

    slider.style.display = 'none';
  } else {

    slider.style.display = 'block';
  }

  sliderContainer.noUiSlider.updateOptions({
    range: {
      min: sliderSetting.min,
      max: sliderSetting.max,
    },
    start: sliderSetting.start,
    step: sliderSetting.step,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });


  sliderContainer.noUiSlider.on('update', (values, handle) => {
    sliderValue.value = values[handle];
    if (evt.target.value === SpecialStyle.NONE) {
      sliderEffect.style.filter = SpecialStyle.NONE;

    } else {
      let units = '';
      switch (evt.target.value) {
        case SpecialStyle.MARVIN:
          units = '%'
          break;
        case SpecialStyle.PHOBOS:
          units = 'px'
          break;
      }
      sliderEffect.style.filter = `${sliderSetting.effect}(${sliderValue.value}${units})`
    }
  });
}

effectsList.addEventListener('change', onEffectsListChange)

export {setSliderDefaultSettings};
