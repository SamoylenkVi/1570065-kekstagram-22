import { addingPictures } from './pictures.js';

const IMPORT_SERVER = 'https://22.javascript.pages.academy/kekstagram/data';
const pictureContainer = document.querySelector('.pictures');
let dataPictures = [];

fetch(IMPORT_SERVER)
  .then((response) => response.json())
  .then((photos) => {
    dataPictures = photos.slice();
    addingPictures(photos.slice(), pictureContainer)
  });
// .catch(() =>{
//   createErrorMesage();
// });

export { dataPictures }
