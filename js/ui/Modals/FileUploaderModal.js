/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal{
  constructor(element) {
    super(element);
    this.divHeader = this.domElement.children[0];
    this.divContent = this.domElement.children[1];
    this.divActions = this.domElement.children[2];
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.divHeader.children[0].addEventListener('click', () => {
      this.close();
    });

    this.divActions.children[0].addEventListener('click', () => {
      this.close();
    });

    this.divActions.children[1].addEventListener('click', () => {
      this.sendAllImages();
    });

    this.divContent.addEventListener('click', (event) => {
      const elementName = event.target.localName;
      if (elementName == 'input') {
        event.target.parentElement.classList.remove('error');
        event.target.addEventListener('blur', (blurEvent) => {
          if (blurEvent.target.value.trim() == '') {
            blurEvent.target.value = '';
            event.target.parentElement.classList.add('error');
          }
        });
      } else if ((elementName == 'button') || (elementName == 'i')) {
        const conteiner = event.target.closest('.image-preview-container');
        this.sendImage(conteiner);
      }
    });
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const img = Array.from(images);
    img.reverse();
    const arrayImg = img.map((element, index) => {
      return this.getImageHTML(element, index);
    });
    this.divContent.innerHTML = arrayImg.join('');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item, index) {
    const element = `
      <div class="image-preview-container">
        <img src="${item.src}" />
        <div class="ui action input">
          <input type="text" placeholder="Путь к файлу" value="Noname_${index}">
          <button class="ui button"><i class="upload icon"></i></button>
        </div>
      </div>
    `;
    return element;
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    const array = Array.from(this.divContent.children);
    array.forEach((element) => {
      this.sendImage(element);
    });
  } 

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {    
    const div = imageContainer.querySelector('div.ui');
    if (div.className.includes('error')) {
      div.classList.add('disabled');
      return;
    } else {
      Yandex.getToken();
      const src = imageContainer.querySelector('img').src;
      const path = imageContainer.querySelector('input').value;
      const callback = () => {
        imageContainer.remove();
        if (this.divContent.children.length == 0) {
          App.getModal('fileUploader').close();
        }
      };
      Yandex.uploadFile(path, src, callback);
    }
  };
}