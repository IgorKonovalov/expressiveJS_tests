let http = require("http");
// let request = http.request({
//   hostname: "eloquentjavascript.net",
//   path: "/author",
//   method: "GET",
//   headers: {Accept: "text/html"}}, function(response) {
//     response.on("data", function(chunk) {
//       process.stdout.write(chunk.toString()); // тоже что и console.log но без /n и херни
//     });
// });
// request.end();

function requestAuthorWithDifferentHeaders(type) {
  let request = http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: type}}, function(response) {
      response.on("data", function(chunk) {
        process.stdout.write(chunk.toString()); // тоже что и console.log но без /n и херни
      });
  });
  request.end();
}

let types = ["text/plain",
             "text/html",
             "application/json",
             "application/rainbows+unicorns"];

types.forEach(type => requestAuthorWithDifferentHeaders(type));
