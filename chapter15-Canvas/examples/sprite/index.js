let cx = document.querySelector("canvas").getContext("2d");
let img = document.createElement("img");
img.src = "img/player.png";
let spriteW = 24, spriteH = 30;

function flipHorisontally(context, around) { // поворот в обратную сторону - меняем ось Y на место поворота, поворачиваем и меняем обратно
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

img.addEventListener("load", function() {
  let cycle = 0;
  flipHorisontally(cx, 100 + spriteW / 2);
  setInterval(function() {
    cx.clearRect(100, 0, spriteW, spriteH); // стираем старое
    cx.drawImage(img,
                 cycle * spriteW, 0, spriteW, spriteH, // вырезаем кусок из img согласно cycle
                 100, 0, spriteW, spriteH); // и вставляем его в координаты x 100 y 0 с данными высотой и шириной
    cycle = (cycle + 1) % 8;
  }, 100);
});
