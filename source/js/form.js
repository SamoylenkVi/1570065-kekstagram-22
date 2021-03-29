import { setSliderDefaultSettings } from './slider.js'
const STEP = 25;
const VALUE_MAX = 100;
const DEFAULT_SCALE = 1;

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
}

const formEditingPicture = document.querySelector('.img-upload__form');
const loadingPicture = formEditingPicture.querySelector('#upload-file');
const editingPicture = formEditingPicture.querySelector('.img-upload__overlay');
const uploadCancel = formEditingPicture.querySelector('#upload-cancel');
const body = document.querySelector('body');
const scaleControlSmaller = formEditingPicture.querySelector('.scale__control--smaller');
const scaleControlBigger = formEditingPicture.querySelector('.scale__control--bigger');
const scaleControlValue = formEditingPicture.querySelector('.scale__control--value');
const pictureSize = formEditingPicture.querySelector('.img-upload__preview ');
const inputHashtags = formEditingPicture.querySelector('.text__hashtags');
const commentTextarea = formEditingPicture.querySelector('.text__description');


const clouseEditingPicture = () => {
  body.classList.remove('modal-open');
  editingPicture.classList.add('hidden');
  formEditingPicture.reset();
  commentTextarea.classList.remove('error-message');
  inputHashtags.classList.remove('error-message');
  setSliderDefaultSettings();
  pictureSize.style.transform = `scale(${DEFAULT_SCALE})`
  document.removeEventListener('keydown', onEscapeCloseEditingPicture);
}

const onCloseEditingPictureClick = () => {
  clouseEditingPicture();

}

const onEscapeCloseEditingPicture = (evt) => {
  const isEscapeDown = evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
  const isInputHashtagFocus = document.activeElement === inputHashtags;
  const isTeaxtareaCommentFocus = document.activeElement === commentTextarea;

  if (isEscapeDown && !(isInputHashtagFocus || isTeaxtareaCommentFocus)) {
    evt.preventDefault();
    clouseEditingPicture();
  }
}

const onOpenEditingPicture = () => {
  body.classList.add('modal-open');
  editingPicture.classList.remove('hidden');

  uploadCancel.addEventListener('click', onCloseEditingPictureClick);
  document.addEventListener('keydown', onEscapeCloseEditingPicture);
}

loadingPicture.addEventListener('click', evt => {
  if (!editingPicture.classList.contains('hidden')) {
    evt.preventDefault();
  }
});

loadingPicture.addEventListener('change', onOpenEditingPicture);


scaleControlSmaller.addEventListener('click', () => {
  const scaleControlValueNumber = +scaleControlValue.value.replace('%', '');
  if (scaleControlValueNumber > STEP) {
    scaleControlValue.value = (scaleControlValueNumber - STEP) + '%';
    const scaleNumberSmaller = (scaleControlValueNumber - STEP) / 100
    pictureSize.style.transform = `scale(${scaleNumberSmaller})`
  }
})

scaleControlBigger.addEventListener('click', () => {
  const scaleControlValueNumber = +scaleControlValue.value.replace('%', '');
  if (scaleControlValueNumber < VALUE_MAX) {
    scaleControlValue.value = (scaleControlValueNumber + STEP) + '%';
    const scaleNumberBigger = (scaleControlValueNumber + STEP) / 100
    pictureSize.style.transform = `scale(${scaleNumberBigger})`
  }

})
export { clouseEditingPicture };
