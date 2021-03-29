import {clouseEditingPicture} from './form.js'
const EXPORT_SERVER = 'https://22.javascript.pages.academy/kekstagram';

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
}

const formEditingPicture = document.querySelector('.img-upload__form');
const successMesage = document.querySelector('#success')
  .content;
const errorMesage = document.querySelector('#error')
  .content;
const main = document.querySelector('main');


const addFormEditingPictureSubmit = (onSuccess, onError) => {

  formEditingPicture.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      EXPORT_SERVER,
      {
        method: 'POST',
        body: formData,
      },
    ).then(() => onSuccess())
      .catch(() => onError())
  })
}

const createSuccessMesage = () => {
  const successPopUp = successMesage.cloneNode(true);
  document.addEventListener('keydown', escapeSuccessKeydownHandler);
  document.addEventListener('click', closeSuccessPopUpHandler);
  main.appendChild(successPopUp);
  clouseEditingPicture();
}

const escapeSuccessKeydownHandler = (evt) => {
  const popUp = main.querySelector('.success')

  evt.preventDefault();

  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    popUp.remove();
  }

  document.removeEventListener('keydown', escapeSuccessKeydownHandler);
  document.removeEventListener('click', closeSuccessPopUpHandler);

}

const closeSuccessPopUpHandler = () => {
  const popUp = main.querySelector('.success')
  popUp.remove();

  document.removeEventListener('click', closeSuccessPopUpHandler);
  document.removeEventListener('keydown', escapeSuccessKeydownHandler);
}
const createErrorMesage = () => {
  const error = errorMesage.cloneNode(true);
  document.addEventListener('keydown', escapeErrorKeydownHandler);
  document.addEventListener('click', closeErrorPopUpHandler);
  main.appendChild(error);
  clouseEditingPicture();
}

const escapeErrorKeydownHandler = (evt) => {
  const popUpError = main.querySelector('.error')

  evt.preventDefault();

  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    popUpError.remove();
  }

  document.removeEventListener('keydown', escapeErrorKeydownHandler);
  document.removeEventListener('click', closeErrorPopUpHandler);

}

const closeErrorPopUpHandler = () => {
  const popUpError = main.querySelector('.error')
  popUpError.remove();

  document.removeEventListener('click', closeErrorPopUpHandler);
  document.removeEventListener('keydown', escapeErrorKeydownHandler);
}

addFormEditingPictureSubmit(createSuccessMesage, createErrorMesage);

export {Keys};
