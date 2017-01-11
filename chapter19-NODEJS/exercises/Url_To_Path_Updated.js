
function urlToPath(url) { // старый вариант, допускает подъем по папкам
  let path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}

function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var decoded = decodeURIComponent(path);
  return "." + decoded.replace(/(\/|\\)\.\.(\/|\\|$)/g, "/"); // регулярное выражение не допускает перехода вверх
}
