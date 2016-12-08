
let dots = [];

for (let i = 0; i < 25; i++) {
  let dot = document.createElement("div");
  dot.className = "trail";
  dot.innerHTML = "<img src='img/cat.jpeg'>";
  dots.push(dot);
  document.body.appendChild(dot);
}

let current = 0;
document.body.addEventListener("mousemove", function(event) {

    let dot = dots[current];
    dot.style.left = (event.pageX - 3) + "px";
    dot.style.top = (event.pageY - 3) + "px";
    current = (current + 1) % dots.length;

});
