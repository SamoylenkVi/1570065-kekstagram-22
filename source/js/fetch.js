import { addingPictures } from './pictures.js';


const CLASS_NAME = 'loading__error';
const TEXT = 'Произошла ошибка! Попробуйте обновить страницу';
const BUTTON_TEXT = 'Закрыть';
const IMPORT_SERVER = 'https://22.javascript.pages.academy/kekstagram/data';

const pictureContainer = document.querySelector('.pictures');

let dataPictures = [];

const createErrorMessage = () => {

  const message = document.createElement('div');
  message.classList.add(CLASS_NAME);
  const textMessage = document.createElement('p');
  textMessage.textContent = TEXT;
  const button = document.createElement('button');
  button.textContent = BUTTON_TEXT;
  message.appendChild(textMessage);
  message.appendChild(button);
  pictureContainer.appendChild(message);

  const closeErrorPopUpHandler = () => {
    message.remove();
    document.removeEventListener('click', closeErrorPopUpHandler);
  }

  button.addEventListener('click', closeErrorPopUpHandler);
};

fetch(IMPORT_SERVER)
  .then((response) => response.json())
  .then((photos) => {
    dataPictures = photos.slice();
    addingPictures(photos.slice(), pictureContainer);
  })
  .catch(() => {
    createErrorMessage();
  });

export { dataPictures }
