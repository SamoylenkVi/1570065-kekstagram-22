const SocialClassName = {
  COMMENT: 'social__comment',
  PICTURE: 'social__picture',
  TEXT: 'social__text',
}


const Size = {
  WIDTH: 35,
  HEIGHT: 35,
}

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
const likesPicture = bigPictureContainer.querySelector('.likes-count');
const commentsPicture = bigPictureContainer.querySelector('.comments-count');
const descriptionPicture = bigPictureContainer.querySelector('.social__caption');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const body = document.querySelector('body');



const createBigPicture = ({ comments, likes, url, description }) => {
  bigPictureImg.src = url;
  likesPicture.textContent = likes;
  commentsPicture.textContent = comments.length;
  descriptionPicture.textContent = description;
}

const createElement = (avatar, name, message, commentsContainer) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add(SocialClassName.COMMENT);
  const picture = document.createElement('img');
  picture.classList.add(SocialClassName.PICTURE);
  picture.width = Size.WIDTH;
  picture.height = Size.HEIGHT;
  picture.src = avatar;
  picture.alt = name;
  commentItem.appendChild(picture);
  const commentMassage = document.createElement('p');
  commentMassage.classList.add(SocialClassName.TEXT);
  commentMassage.textContent = message;
  commentItem.appendChild(commentMassage);
  commentsContainer.appendChild(commentItem);
};

const createComment = ({ comments }) => {
  commentsContainer.innerHTML = '';
  let fragment = document.createDocumentFragment();

  comments.forEach(comment => {
    createElement(comment.avatar, comment.name, comment.message, fragment);
  });
  commentsContainer.appendChild(fragment);
}

export { body, bigPictureContainer, createComment, createBigPicture }
