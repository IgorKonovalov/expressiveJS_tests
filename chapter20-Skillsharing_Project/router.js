let Router = module.exports = function() { // экспортируем конструктор роутер
  this.routes = [];
};

Router.prototype.add = function(method, url, handler) { // роутер является всомогательным модулем, в который можно добавить различные методы - то, как будет реагировать сервер на клиента. Здесь мы добавляем методы
  this.routes.push({method: method,
                    url: url,
                    handler: handler});
};

Router.prototype.resolve = function(request, response) { // распределяем запросы
  let path = require("url").parse(request.url).pathname; // парсим путь запроса

  return this.routes.some(function(route) { // пробуем пути по очереди, и останавливаемся с true если путь найден
    let match = route.url.exec(path); // exec выполняет дочерний процесс в буфере
    if (!match || route.method != request.method)
      return false;

    let urlParts = match.slice(1).map(decodeURIComponent); // берем первый кусок match - декодируем его для корректного пути
    route.handler.apply(null, [request, response] // и вызываем handler с подготовленным для него путем
                                .concat(urlParts));
    return true;
  });
};
