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
      if (this.search.value.trim()) {
        VK.get(this.search.value, (listImg) => {
          VK.lastCallback = () => {};
          this.search.value = '';
          this.search.focus();
          const imageDiv = App.imageViewer;
          imageDiv.clear();
          imageDiv.drawImages(listImg);
        });
      }
    });

    this.add.addEventListener('click', () => {
      // Событие кнопки добавить
      if (this.search.value.trim()) {
        VK.get(this.search.value, (listImg) => {
          VK.lastCallback = () => {};
          this.search.value = '';
          this.search.focus();
          const imageDiv = App.imageViewer;
          imageDiv.drawImages(listImg);
        });
      }
    });

    this.search.addEventListener('keyup', (event) => {
      // Событие изменения поля input (нажатие Enter)
      if (event.keyCode === 13) {
        this.replace.click();
      }
    });
  }
}