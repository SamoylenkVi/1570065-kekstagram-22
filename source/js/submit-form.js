import {closeEditingPicture} from './form.js'
import { Key } from './form.js';

const EXPORT_SERVER = 'https://22.javascript.pages.academy/kekstagram';


const formEditingPicture = document.querySelector('.img-upload__form');
const successMessage = document.querySelector('#success')
  .content;
const errorMessage = document.querySelector('#error')
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

const createSuccessMessage = () => {
  const successPopUp = successMessage.cloneNode(true);
  document.addEventListener('keydown', onEscapeSuccessKeydown);
  document.addEventListener('click', onCloseSuccessPopUp);
  main.appendChild(successPopUp);
  closeEditingPicture();
}

const onEscapeSuccessKeydown = (evt) => {
  const popUp = main.querySelector('.success')

  evt.preventDefault();

  if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
    popUp.remove();
  }

  document.removeEventListener('keydown', onEscapeSuccessKeydown);
  document.removeEventListener('click', onCloseSuccessPopUp);

}

const onCloseSuccessPopUp = () => {
  const popUp = main.querySelector('.success')
  popUp.remove();

  document.removeEventListener('click', onCloseSuccessPopUp);
  document.removeEventListener('keydown', onEscapeSuccessKeydown);
}
const createErrorMessage = () => {
  const error = errorMessage.cloneNode(true);
  document.addEventListener('keydown', onEscapeErrorKeydown);
  document.addEventListener('click', onCloseErrorPopUp);
  main.appendChild(error);
  closeEditingPicture();
}

const onEscapeErrorKeydown = (evt) => {
  const popUpError = main.querySelector('.error')

  evt.preventDefault();

  if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
    popUpError.remove();
  }

  document.removeEventListener('keydown', onEscapeErrorKeydown);
  document.removeEventListener('click', onCloseErrorPopUp);

}

const onCloseErrorPopUp = () => {
  const popUpError = main.querySelector('.error')
  popUpError.remove();

  document.removeEventListener('click', onCloseErrorPopUp);
  document.removeEventListener('keydown', onEscapeErrorKeydown);
}

addFormEditingPictureSubmit(createSuccessMessage, createErrorMessage);

