function reqListener () {
  showContent(this.responseText);
}

function showContent(msg) {
  let elt = document.createElement("div");
  elt.textContent = msg;
  return document.body.appendChild(elt);
}

let req = new XMLHttpRequest;

req.addEventListener("load", reqListener);
req.open("GET", "http://eloquentjavascript.net/author", true);
req.setRequestHeader("Accept", "application/rainbows+unicorns");

req.send();

// из ответов
//
// function requestAuthor(type) {
//   var req = new XMLHttpRequest();
//   req.open("GET", "http://eloquentjavascript.net/author", false);
//   req.setRequestHeader("accept", type);
//   req.send(null);
//   return req.responseText;
// }
//
// var types = ["text/plain",
//              "text/html",
//              "application/json",
//              "application/rainbows+unicorns"];
//
// types.forEach(function(type) {
//   try {
//     console.log(type + ":\n", requestAuthor(type), "\n");
//   } catch (e) {
//     console.log("Raised error: " + e);
//   }
// });
