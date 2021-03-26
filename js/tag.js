
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const REGULAR = new RegExp('#[a-zA-Zа-яёА-ЯЁ0-9]+');

const inputHashtags = document.querySelector('.text__hashtags');
// const commentField = document.querySelector('.text__description');

inputHashtags.addEventListener('input', () => {

  const invalidMessage = [];

  inputHashtags.setCustomValidity('');

  const inputHashtagText = inputHashtags.value.toLowerCase().trim();

  if (!inputHashtagText) {
    return
  }

  const inputArray = inputHashtagText.split(/\s+/);

  if (inputArray.length === 0) {
    return
  }

  const isStartNotHashTag = inputArray.some((tag) => {
    return tag[0] !== '#';
  });

  if (isStartNotHashTag) {
    invalidMessage.push('Хэш-тег начинается с символа # ')
  }
  const isOnlyLatticeHashTag = inputArray.some((tag) => {
    return tag === '#';
  });

  if (isOnlyLatticeHashTag) {
    invalidMessage.push('Хэш-тег не может состоять только из одной решётки')
  }

  const isSplitSpaceHashTag = inputArray.some((tag) => {
    return tag.indexOf('#', 1) >= 1;
  });

  if (isSplitSpaceHashTag) {
    invalidMessage.push('Хэш-теги разделяются пробелами')
  }

  const isRepeatHashTag = inputArray.some((tag , i , arr) => {
    return arr.indexOf(tag, i + 1) >=  i + 1;
  });

  if (isRepeatHashTag) {
    invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды')
  }


  const isLongHashTag = inputArray.some((tag) => {
    return tag.length > MAX_SYMBOLS;
  });

  if (isLongHashTag) {
    invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку')
  }

  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessage.push('Нельзя указать больше пяти хэш-тегов')
  }

  if (!REGULAR.test(inputHashtagText))
  {
    invalidMessage.push('Хеш-тег должен состоять из букв и чисел')
  }

  if (invalidMessage.length > 0) {
    inputHashtags.setCustomValidity(invalidMessage.join('. \n'));
    inputHashtags.style.border = '2px solid red';
  } else {
    inputHashtags.style.border = 'none';
  }

});

// commentField.addEventListener('input', () =>{
// console.log('gjkexbkjcm ')
// })

