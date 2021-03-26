const STEP = 25;
const VALUE_MAX = 100;

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
const pictureSize = formEditingPicture.querySelector('.img-upload__preview ')
const inputHashtags = document.querySelector('.text__hashtags');

const onOpenEditingPicture = () => {
  body.classList.add('modal-open');
  editingPicture.classList.remove('hidden');

  document.removeEventListener('change', onOpenEditingPicture);
}
const clouseEditingPicture = () => {
  body.classList.remove('modal-open');
  editingPicture.classList.add('hidden');
  formEditingPicture.reset();
}

const onCloseEditingPicture = () => {
  clouseEditingPicture();
  document.removeEventListener('click', onCloseEditingPicture);
  document.removeEventListener('keydown', onEscapeCloseEditingPicture);
}

const onEscapeCloseEditingPicture = (evt) => {

  evt.preventDefault();

  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    clouseEditingPicture();
  }

  document.removeEventListener('click', onCloseEditingPicture);
  document.removeEventListener('keydown', onEscapeCloseEditingPicture);
}

loadingPicture.addEventListener('change', onOpenEditingPicture);
uploadCancel.addEventListener('click', onCloseEditingPicture);
document.addEventListener('keydown', onEscapeCloseEditingPicture);

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

const oninputHashtagsFocus = () => {
  document.removeEventListener('keydown', onEscapeCloseEditingPicture);
  document.removeEventListener('focus', oninputHashtagsFocus)
}
const oninputHashtagsBlur = () => {
  document.addEventListener('keydown', onEscapeCloseEditingPicture);
  document.removeEventListener('focus', oninputHashtagsBlur)
}

inputHashtags.addEventListener('focus', oninputHashtagsFocus);
inputHashtags.addEventListener('blur', oninputHashtagsBlur);
