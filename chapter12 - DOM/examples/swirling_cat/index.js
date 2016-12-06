var cat = document.getElementById("swirling_cat");

var angle = 0, lastTime = null;

function animate(time) {
  if (lastTime != null)
    angle += (time - lastTime) * 0.001;
  lastTime = time;
  cat.style.top = (Math.sin(angle) * 20) + "px";
  cat.style.left = (Math.cos(angle) * 200) + "px";
  requestAnimationFrame(animate);// функция вызывает рекурсивно сама себя, чтобы анимация продолжалась
  console.log("Координаты:" + cat.style.top + " + " + cat.style.left);
}
requestAnimationFrame(animate); // вызываем функцию первый раз, прося перерисовать с ее помощью окно
