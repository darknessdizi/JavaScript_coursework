/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor(element) {
    this.window = element;
    this.domElement = this.window[0];
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    this.window.modal('show');
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    this.window.modal('hide');
  }


}
