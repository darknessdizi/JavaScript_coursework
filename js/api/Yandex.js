/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    if (!localStorage.getItem('tokenYandex')) {
      const token = prompt('Введите токен для Yandex disc: ');
      localStorage.setItem('tokenYandex', token);
    }
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    createRequest({
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `OAuth ${localStorage.getItem('tokenYandex')}`,
      },
      'data': {
        'path': path,
        'url': url,
      },
      'url': Yandex.HOST + '/resources/upload?',
      'callback': callback,
    });
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){

  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){

  }
}
