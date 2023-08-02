/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor(element) {
    this.images = element.querySelector('.grid .row');
    this.buttonSelectAll = element.querySelector('.select-all');
    this.buttonShowFiles = element.querySelector('.show-uploaded-files');
    this.buttonSend = element.querySelector('.send');
    this.wideImg = element.querySelector('.column.six.wide');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.images.addEventListener('click', (event) => {
      // Меняет класс активности у изображения по клику
      if (!event.target.className.includes('image-wrapper')) {
        event.target.classList.toggle('selected');
        this.checkButtonText();
      }
    });

    this.images.addEventListener('dblclick', (event) => {
      // Отображает изображаения в блоке предпросмотра при двойном клике
      if (!event.target.className.includes('image-wrapper')) {
        const img = this.wideImg.querySelectorAll('img');
        if (img.length > 1) {
          img[0].remove();
        } else {
          img[0].classList.add('hidden');
          img[0].classList.remove('fluid');
        }
        const newImg = document.createElement('img');
        newImg.src = event.target.src;
        newImg.className = 'ui fluid image';
        this.wideImg.insertAdjacentElement('afterbegin', newImg);
      }
    });

    this.wideImg.addEventListener('dblclick', (event) => {
      // Удаляет изображение из области предпросмотра при двойном клике
      if (!event.target.className.includes('image-wrapper')) {
        const img = this.wideImg.querySelectorAll('img');
        if (img.length > 1) {
          img[0].remove();
          img[1].classList.remove('hidden');
          img[1].classList.add('fluid');
        }
      }
    });

    this.buttonSelectAll.addEventListener('click', (event) => {
      // Клик по кнопке "Выбрать всё" / "Снять выделение"
      const textButton = this.buttonSelectAll.textContent;
      if (textButton.includes('Снять выделение')) {
        const listImg = this.images.querySelectorAll('img.selected');
        listImg.forEach((element) => {
          element.classList.remove('selected');
        });
      } else {
        const listAllImg = this.images.querySelectorAll('img');
        for (let img of listAllImg) {
          img.classList.add('selected');
        }
      }
      this.checkButtonText();
    });

    this.buttonSend.addEventListener('click', () => {
      // Клик по кнопке "Отправить на диск"
      const appUploader = App.getModal('fileUploader');
      appUploader.open();
      const images = this.images.querySelectorAll('img.selected');
      appUploader.showImages(images);
    });

  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.images.textContent = '';
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      for (let i=0; i<images.length; i++) {
        const img = document.createElement('img');
        img.src = images[i];
        const div = document.createElement('div');
        div.className = 'four wide column ui medium image-wrapper';
        div.insertAdjacentElement('afterbegin', img);
        this.images.insertAdjacentElement('afterbegin', div);
      }
    } 
    const countImg = this.images.querySelectorAll('img');
    if (countImg.length == 0) {
      this.buttonSelectAll.classList.add('disabled');
    } else {
      this.buttonSelectAll.classList.remove('disabled');
    }
    this.checkButtonText();
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    let arrayImage = this.images.querySelectorAll('img');
    arrayImage = Array.from(arrayImage);
    const findSelectArray = arrayImage.filter((element) => {
      return element.className.includes('selected');
    });
    if (findSelectArray.length > 0) {
      this.buttonSend.classList.remove('disabled');
    } else {
      this.buttonSend.classList.add('disabled');
    }
   
    if (findSelectArray.length == arrayImage.length) {
      if (findSelectArray.length > 0) {
        this.buttonSelectAll.textContent = 'Снять выделение';
      } else {
        this.buttonSelectAll.textContent = 'Выбрать всё';
      }
    } else {
      this.buttonSelectAll.textContent = 'Выбрать всё';
    }
  }

}