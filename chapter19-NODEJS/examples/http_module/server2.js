let http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  request.on("data", function(chunk) {
    response.write(chunk.toString().toUpperCase());
  });
  request.on("end", function() {
    response.end();
  });
}).listen(8000);
