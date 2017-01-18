let http = require("http");
let server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Привет!</h1><p>Вы запросили `" + request.url + "`</p>");
  response.end();
});
server.listen(8000);

// запусти меня localhost:8000, я жду
