/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const url = options['url'] + '?' + new URLSearchParams(options['data']);
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
    const images = []
    
    xhr.onload = function() {
        if (xhr.status >= 400) {
            console.log('Ошибка запроса');
            console.log(xhr.response);
        } else if (xhr.status == 200) {
            if (xhr.response.href) {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = xhr.response.href;
                a.download = '';
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                options['callback'](xhr.response.items);
            }
        } else if ((xhr.status == 202) || (xhr.status == 204)) { 
            options['callback']();
        } 
    };
};