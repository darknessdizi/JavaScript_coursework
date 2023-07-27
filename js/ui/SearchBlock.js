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
    this.search.addEventListener('change', () => {
      // this.value = this.search.value;
      // console.log(this.value)
      // let newList;
      VK.get(this.search.value, (listImg) => {
        console.log('search', listImg)
        const row = document.querySelector('div.gutters.ui.small.images')
        console.log('request', row)
        // const newList = listImg
        // return newList;
      });
      // console.log('request', a)
      // console.log('newList', newList)
    });

  }

}