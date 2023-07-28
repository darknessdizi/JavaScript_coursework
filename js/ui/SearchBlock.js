/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor(element) {
    this.search = element.querySelector('input');
    this.replace = element.querySelector('.replace');
    this.add = element.querySelector('.add');
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    this.replace.addEventListener('click', () => {
      // Событие кнопки заменить
      VK.get(this.search.value, (listImg) => {
        VK.lastCallback = () => {};
        this.search.value = '';
        this.search.focus();
        if (listImg.length > 0) {
          const imageDiv = App.imageViewer;
          imageDiv.images.textContent = '';
          imageDiv.drawImages(listImg);
        }
      });
    });

    this.add.addEventListener('click', () => {
      // Событие кнопки добавить
      VK.get(this.search.value, (listImg) => {
        VK.lastCallback = () => {};
        this.search.value = '';
        this.search.focus();
        if (listImg.length > 0) {
          const imageDiv = App.imageViewer;
          imageDiv.drawImages(listImg);
        }
      });
    });

    this.search.addEventListener('change', () => {
      // Событие изменения поля input (нажатие Enter)
      VK.get(this.search.value, (listImg) => {
        VK.lastCallback = () => {};
        this.search.value = '';
        this.search.focus();
        if (listImg.length > 0) {
          const imageDiv = App.imageViewer;
          imageDiv.images.textContent = '';
          imageDiv.drawImages(listImg);
        }
      });
    });

  }
}