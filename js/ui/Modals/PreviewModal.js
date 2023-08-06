/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal{
  constructor(element) {
    super(element);
    this.divHeader = this.domElement.children[0];
    this.divContent = this.domElement.children[1];
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.divHeader.children[0].addEventListener('click', () => {
      this.close();
    });

    this.divContent.addEventListener('click', (event) => {
      const btn = event.target;
      if (event.target.className.includes('delete')) {
        const icon = btn.querySelector('i');
        icon.classList.add('spinner');
        icon.classList.add('loading');
        btn.classList.add('disabled');
        Yandex.removeFile(btn.dataset.path, () => {
          const deleteBlock = event.target.closest('.image-preview-container');
          deleteBlock.remove();
        });
      } 
      if (event.target.className.includes('download')) {
        Yandex.downloadFileByUrl(btn.dataset.file);
      } 
    });
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    data.reverse();
    const arrayImg = data.map((element) => {
      return this.getImageInfo(element);
    });
    this.divContent.innerHTML = arrayImg.join('');
  } 

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {   
    let newDate = Date.parse(date);
    newDate = new Date(newDate);
    const month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const currentMonth = month[newDate.getMonth()];
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    let hour = String(newDate.getHours());
    if (hour.length < 2) {
      hour = '0' + hour;
    }
    let minutes = String(newDate.getMinutes());
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    const string = `${day} ${currentMonth} ${year} г. в ${hour}:${minutes}`; 
    return string;
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const data = this.formatDate(item.created);
    const element = `
    <div class="image-preview-container">
      <img src='${item.file}' />
      <table class="ui celled table">
        <thead>
          <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
        </thead>
        <tbody>
          <tr><td>${item.name}</td><td>${data}</td><td>${item.size}Кб</td></tr>
        </tbody>
      </table>
      <div class="buttons-wrapper">
        <button class="ui labeled icon red basic button delete" data-path='${item.path}'>
          Удалить
          <i class="trash icon"></i>
        </button>
        <button class="ui labeled icon violet basic button download" data-file='${item.path}'>
          Скачать
          <i class="download icon"></i>
        </button>
      </div>
    </div>
    `;
    return element;
  }
}
