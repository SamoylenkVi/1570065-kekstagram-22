const NUMBER_OF_COMMENTS = 5;

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
const loadMoreCommentButton = document.querySelector('.social__comments-loader');
let commentsBigPicture = [];
let counterComments = 0;
let endIndexComment = NUMBER_OF_COMMENTS;

const createBigPicture = ({ comments, likes, url, description }) => {
  bigPictureImg.src = url;
  likesPicture.textContent = likes;
  commentsPicture.textContent = comments.length;
  descriptionPicture.textContent = description;
  createComment(comments);
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

const createPartComment = (comments, startComment, endComment) => {

  let fragment = document.createDocumentFragment();

  const commentsPart = comments.slice(startComment, endComment);

  commentsPart.forEach(comment => {
    createElement(comment.avatar, comment.name, comment.message, fragment);
  });

  return fragment
}

const onloadMoreCommentButton = (evt) => {

  evt.preventDefault()
  endIndexComment = NUMBER_OF_COMMENTS + counterComments;
  const fragment = createPartComment(commentsBigPicture, counterComments, endIndexComment);

  commentsContainer.appendChild(fragment);
  counterComments += NUMBER_OF_COMMENTS;

  if (counterComments >= commentsBigPicture.length) {
    loadMoreCommentButton.classList.add('hidden');
  }
}

loadMoreCommentButton.addEventListener('click', onloadMoreCommentButton)

const createComment = (comments) => {

  counterComments = 0;
  endIndexComment = NUMBER_OF_COMMENTS;
  commentsBigPicture = comments

  commentsContainer.innerHTML = '';

  loadMoreCommentButton.classList.remove('hidden')

  if (NUMBER_OF_COMMENTS >= commentsBigPicture.length) {
    loadMoreCommentButton.classList.add('hidden');
  }

  const fragment = createPartComment(commentsBigPicture, counterComments, endIndexComment);

  commentsContainer.appendChild(fragment);
  endIndexComment = NUMBER_OF_COMMENTS + counterComments;
  counterComments += NUMBER_OF_COMMENTS;

}

export { body, bigPictureContainer, createComment, createBigPicture }
