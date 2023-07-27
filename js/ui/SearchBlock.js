/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.search = document.querySelector('input');
    this.replace = document.querySelector('.replace');
    this.add = document.querySelector('.add');
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    this.replace.addEventListener('click', () => {
      VK.get(this.search.value, (listImg) => {
        this.search.value = '';
        this.search.focus();
        if (listImg.length > 0) {
          const row = document.querySelector('div.gutters.ui.small.images');
          row.textContent = '';
          for (let i=0; i<listImg.length; i++) {
            const img = document.createElement('img');
            img.className = 'ui image';
            img.src = listImg[i];
            row.insertAdjacentElement('afterbegin', img);
          }
        }
      });
    });

    this.add.addEventListener('click', () => {
      VK.get(this.search.value, (listImg) => {
        this.search.value = '';
        this.search.focus();
        if (listImg.length > 0) {
          const row = document.querySelector('div.gutters.ui.small.images');
          for (let i=0; i<listImg.length; i++) {
            const img = document.createElement('img');
            img.className = 'ui image';
            img.src = listImg[i];
            row.insertAdjacentElement('afterbegin', img);
          }
        }
      });
    });

  }
}