import { body, bigPictureContainer, createComment, createBigPicture } from './big-picture.js'

const pictureTemplate = document.querySelector('#picture')
  .content;


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

const addingPictures = (pictures, container) => {

  let fragment = document.createDocumentFragment();

  pictures.forEach(picture => {
    const postImage = getPictureElement(picture);

    fragment.appendChild(postImage);

    fragment.lastElementChild.addEventListener('click', (evt) => {

      evt.preventDefault();

      body.classList.add('modal-open');
      bigPictureContainer.classList.remove('hidden');

      createComment(picture)
      createBigPicture(picture)
    })
  });

  container.appendChild(fragment)
}

export { addingPictures }
