const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const Picture = {
  WIDTH: 600,
  HEIGHT: 600,
};

const uploadFile = document.querySelector('#upload-file');
const uploadPreviwContainer = document.querySelector('.img-upload__preview');
const uploadPreviw = uploadPreviwContainer.querySelector('img');

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadPreviw.src = reader.result;
      uploadPreviw.width = Picture.WIDTH;
      uploadPreviw.height = Picture.HEIGHT;
    })

    reader.readAsDataURL(file);
  }
});
