/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor(element) {
    // this.images = element.querySelector('.images-list .row');
    this.images = element.querySelector('.gutters');
    this.buttonSelectAll = element.querySelector('.select-all');
    this.showUploadedFiles = element.querySelector('.show-uploaded-files');
    this.buttnoSend = element.querySelector('.send');
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
      if (event.target != this.images) {
        event.target.classList.toggle('disabled');
        event.target.classList.toggle('selected');
        this.buttonSelectAll.textContent = this.checkButtonText();
      }
    });

    this.images.addEventListener('dblclick', (event) => {
      // Отображает изображаения в блоке предпросмотра при двойном клике
      if (event.target != this.images) {
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
      if (event.target != this.images) {
        const img = this.wideImg.querySelectorAll('img');
        if (img.length > 1) {
          img[0].remove();
          img[1].classList.remove('hidden');
          img[1].classList.add('fluid');
        }
      }
    });

    this.buttonSelectAll.addEventListener('click', (event) => {
      // Выбирает все изображения или отменяет активные из них
      const textButton = this.buttonSelectAll.textContent;
      if (textButton.includes('Снять выделение')) {
        const listImg = this.images.querySelectorAll('img.selected');
        listImg.forEach((element) => {
          element.classList.add('disabled');
          element.classList.remove('selected');
        });
        this.buttonSelectAll.textContent = this.checkButtonText();
      } else {
        const listAllImg = this.images.querySelectorAll('img');
        for (let img of listAllImg) {
          img.classList.remove('disabled');
          img.classList.add('selected');
        }
        this.buttonSelectAll.textContent = this.checkButtonText();
      }
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
    for (let i=0; i<images.length; i++) {
      const img = document.createElement('img');
      img.className = 'ui image disabled';
      img.src = images[i];
      this.images.insertAdjacentElement('afterbegin', img);
    }
    if (this.buttonSelectAll.className.includes('disabled')) {
      this.buttonSelectAll.classList.remove('disabled');
    }
    this.buttonSelectAll.textContent = this.checkButtonText();
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    let arrayImage = this.images.querySelectorAll('img');
    arrayImage = Array.from(arrayImage);
    const findElement = arrayImage.find((element) => {
      return element.className.includes('selected');
    });
    if (findElement) {
      this.buttnoSend.classList.remove('disabled');
      return 'Снять выделение';
    } else {
      this.buttnoSend.classList.add('disabled');
      return 'Выбрать всё';
    }
  }

}