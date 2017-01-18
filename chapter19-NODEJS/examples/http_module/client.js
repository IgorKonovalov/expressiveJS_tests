let http = require("http");
let request = http.request({
  hostname: "eloquentjavascript.net",
  path: "/20_node.html",
  method: "GET",
  headers: {Accept: "text/html"}}, function(response) {
    console.log("Сервер ответил с кодом ", response.statusCode);
});
request.end();

// простейший клиент. Запусти!
