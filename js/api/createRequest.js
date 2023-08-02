/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const url = options['url'] + new URLSearchParams(options['data']);
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    
    try {
        xhr.open(options['method'], url);
        for (let key in options['headers']) {
            xhr.setRequestHeader(key, options['headers'][key]);
        }
        xhr.send();
    } catch (error) {
        console.error(error);
    }
    
    xhr.onload = function() {
        console.log('xhr.status', xhr.status);
        if (xhr.status >= 400) {
            console.log('Ошибка запроса');
            console.log(xhr.response);
        } else {
            options['callback'](); 
        }
    };
};
