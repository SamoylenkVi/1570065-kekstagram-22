const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 140;
const regExpHashtag = /[^\s#a-zA-Zа-яёА-ЯЁ0-9]|\S#|#[a-zA-Zа-яёА-ЯЁ0-9]{20,}|#\s|(^|\s)[a-zA-Zа-яёА-ЯЁ0-9]+|#$/g;

const inputHashtags = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

inputHashtags.addEventListener('input', () => {

  const invalidMessage = [];

  inputHashtags.setCustomValidity('');

  const inputHashtagText = inputHashtags.value.toLowerCase().trim();

  if (inputHashtagText === '') {
    inputHashtags.classList.remove('error-message');
    return
  }

  if (inputHashtagText.search(regExpHashtag) !== -1) {

    invalidMessage.push('Хеш-тег должен состоять из букв и чисел, не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов')
  }

  const inputArray = inputHashtagText.split(/\s+/);

  if (inputArray.length === 0) {
    return
  }

  const isRepeatHashTag = inputArray.some((tag, i, arr) => {
    return arr.indexOf(tag, i + 1) >= i + 1;
  });

  if (isRepeatHashTag) {
    invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды')
  }

  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessage.push('Нельзя указать больше пяти хэш-тегов')
  }

  if (invalidMessage.length > 0) {
    inputHashtags.setCustomValidity(invalidMessage.join('. \n'));
    inputHashtags.classList.add('error-message');
  } else {
    inputHashtags.classList.remove('error-message');
  }

});

commentField.addEventListener('input', () => {

  const commentFieldText = commentField.value;


  if (commentFieldText.length > MAX_SYMBOLS) {
    commentField.setCustomValidity('Длинна комментария не может составлять больше 140 символов');
    commentField.classList.add('error-message');
  } else {
    commentField.setCustomValidity('');
    commentField.classList.remove('error-message');
  }
})

