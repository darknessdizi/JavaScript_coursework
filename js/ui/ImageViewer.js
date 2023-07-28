/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    // this.images = element.querySelector('.images-list .row');
    this.images = element.querySelector('.gutters');
    this.selectAll = element.querySelector('.select-all');
    this.showUploadedFiles = element.querySelector('.show-uploaded-files');
    this.send = element.querySelector('.send');
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

    this.selectAll.addEventListener('click', (event) => {
      // Выбирает все активные изображения
      const list = this.images.querySelectorAll('img');
      for (let img of list) {
        if (img.className.includes('disabled')) {
          img.classList.remove('disabled');
          img.classList.add('selected');
        }
      }
    });

  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {

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
    this.selectAll.classList.remove('disabled');
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){

  }

}