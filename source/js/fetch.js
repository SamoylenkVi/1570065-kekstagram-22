import { addingPictures } from './pictures.js';


const CLASS_NAME = 'loading__error';
const TEXT = 'Произошла ошибка! Попробуйте обновить страницу';
const BUTTON_TEXT = 'Закрыть';
const IMPORT_SERVER = 'https://22.javascript.pages.academy/kekstagram/data';
const INACTIVE_CLASS_FILTER = 'img-filters--inactive';

const pictureContainer = document.querySelector('.pictures');
const filterforPicter = document.querySelector('.img-filters')

let dataPictures = [];


const createErrorMesage = () => {

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
}

const openFilterforPicter = () => {
  filterforPicter.classList.remove(INACTIVE_CLASS_FILTER);
}

fetch(IMPORT_SERVER)
  .then((response) => response.json())
  .then((photos) => {
    dataPictures = photos.slice();
    addingPictures(photos.slice(), pictureContainer);
    openFilterforPicter()
  })
  .catch(() => {
    createErrorMesage();
  });

export { dataPictures }
