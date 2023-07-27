/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = 'vk1.a.kuzBJ-Hu4cxJ-Qt39sr5OJZB_pqzauT4KXyyPg36-GhJrqz7pXD6TRiyQeDRC_P1P4bzFGXd32WoMO52_wuZcYsRTZmmeXY82-DWjfimovfY4Lr0QWTgaSJNYnFfw32jtfNVCyI8WSiNz5pBQXyifky16-HgvkooaXCNG4gaauvmpMrwqXL3v1JYlRehaMBX';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id='', callback) {
    VK.lastCallback = callback;
    const params = {
      'owner_id': id,
      'album_id': 'profile',
      'extended': 1,
      'photo_sizes': 1,
      'access_token': VK.ACCESS_TOKEN,
      'v': '5.131',
    }
    const url = 'https://api.vk.com/method/photos.get?' + new URLSearchParams(params) + '&callback=VK.processData';
    var elem = document.createElement("script");
    elem.src = url;
    document.head.appendChild(elem);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static async processData(result){
    document.querySelector('script').remove();
    if (result.error) {
      alert(`Ошибка: ${result.error.error_msg}`)
      return;
    }
    const listImg = [];
    for (let i=0; i<result.response.items.length; i++) {
      listImg.push(result.response.items[i].sizes.pop()['url'])
    }
    VK.lastCallback(listImg);
  }
}
