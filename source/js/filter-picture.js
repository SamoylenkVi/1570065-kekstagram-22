import { dataPictures } from './fetch.js';
import { addingPictures } from './pictures.js';
import { getRandomInteger, debounce} from './utils.js';

const MAX_RANDOM_PICTURE = 10;
const pictureContainer = document.querySelector('.pictures');

const imgFiltersContainer = document.querySelector('.img-filters__form');
const randomFilter = imgFiltersContainer.querySelector('#filter-random');
const discussedFilter = imgFiltersContainer.querySelector('#filter-discussed');
const  defaultFilter = imgFiltersContainer.querySelector('#filter-default');

const addActiveClass = (button) => {
  const buttons = imgFiltersContainer.querySelectorAll('button');
  buttons.forEach(button => button.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const onDiscussedFilterClick = (evt) => {
  evt.preventDefault();
  sortsPicturesByComment(dataPictures);
  addActiveClass(discussedFilter);
};

const onRandomFilterClick = (evt) => {
  evt.preventDefault();
  sortsPicturesRandom(dataPictures);
  addActiveClass(randomFilter);
};
const onDefaultFilterClick = (evt) => {
  evt.preventDefault();
  sortsPicturesByDefault(dataPictures);
  addActiveClass(defaultFilter);
};

const sortsPicturesByComment = (pictures) => {
  const picturesCopy = pictures.slice()
  const links = pictureContainer.querySelectorAll('a');
  links.forEach(link => link.remove());
  picturesCopy.sort(function (a, b) {
    return a.comments.length - b.comments.length;
  })
  picturesCopy.reverse();
  addingPictures(picturesCopy, pictureContainer);
};

const sortsPicturesRandom = (pictures) => {
  const picturesCopy = pictures.slice()
  const randomPictures = []
  const links = pictureContainer.querySelectorAll('a');

  links.forEach(link => link.remove());
  for (let i = 0; i < MAX_RANDOM_PICTURE; i++) {
    const randomIndex = getRandomInteger(0, (picturesCopy.length - 1));
    const picture = picturesCopy.splice(randomIndex, 1)[0];
    randomPictures.push(picture)
  }
  addingPictures(randomPictures, pictureContainer);
};

const sortsPicturesByDefault = (pictures) => {
  const picturesCopy = pictures.slice()
  const links = pictureContainer.querySelectorAll('a');
  links.forEach(link => link.remove());
  addingPictures(picturesCopy, pictureContainer);
};

discussedFilter.addEventListener('click', debounce(
  (evt) => onDiscussedFilterClick(evt),
));

randomFilter.addEventListener('click', debounce(
  (evt) => onRandomFilterClick(evt),
));

defaultFilter.addEventListener('click', debounce(
  (evt) => onDefaultFilterClick(evt),
));
