let http = require("http"), fs = require("fs");

let methods = Object.create(null);

http.createServer(function(request, response) {
  function respond(code, body, type) { // передается функциям, обрабатывающим разные методы, и работает как обратный вызов для окончании запроса.
    if (!type) type = "text/plain";
    response.writeHead(code, {"Content-Type": type});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
  }
  if (request.method in methods)
    methods[request.method](urlToPath(request.url), respond, request);
  else
    respond(405, "Method " + request.method + " not allowed.");
}).listen(8000);

function urlToPath(url) { // принимает имя пути, декодирует от странных символов, и вставляет в начале точку
  let path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}
