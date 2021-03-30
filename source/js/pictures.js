import { body, bigPictureContainer, createBigPicture } from './big-picture.js'
import { Key } from './form.js';

const INACTIVE_CLASS_FILTER = 'img-filters--inactive';

const pictureTemplate = document.querySelector('#picture')
  .content;

const bigPictureCancel = document.querySelector('.big-picture__cancel');
const filterForPicter = document.querySelector('.img-filters')

const getPictureElement = ({ comments, likes, url }) => {

  const picture = pictureTemplate.cloneNode(true);
  const sourcePicture = picture.querySelector('.picture__img');
  sourcePicture.src = url;
  const pictureLikes = picture.querySelector('.picture__likes');
  pictureLikes.textContent = likes;
  const pictureComments = picture.querySelector('.picture__comments');
  pictureComments.textContent = comments.length;

  return picture
};

const openFilterForPicter = () => {
  filterForPicter.classList.remove(INACTIVE_CLASS_FILTER);
}

const addingPictures = (pictures, container) => {

  let fragment = document.createDocumentFragment();

  pictures.forEach(picture => {
    const postImage = getPictureElement(picture);

    fragment.appendChild(postImage);

    fragment.lastElementChild.addEventListener('click', (evt) => {

      evt.preventDefault();

      body.classList.add('modal-open');
      bigPictureContainer.classList.remove('hidden');
      document.addEventListener('keydown', onEscapeCloseBigPicture);
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);

      createBigPicture(picture);

    })
  });

  container.appendChild(fragment);

  openFilterForPicter();
}

const onBigPictureCancelClick = () => {
  body.classList.remove('modal-open');
  bigPictureContainer.classList.add('hidden');
}

const onEscapeCloseBigPicture = (evt) => {
  const isEscapeDown = evt.key === Key.ESCAPE || evt.key === Key.ESC;

  if (isEscapeDown) {
    evt.preventDefault();
    onBigPictureCancelClick()
    document.removeEventListener('keydown', onEscapeCloseBigPicture);
  }
}

export { addingPictures }
