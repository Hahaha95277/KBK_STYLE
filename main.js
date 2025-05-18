const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const download = document.getElementById("download");
const camera = document.getElementById("camera");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => drawFinalFramedImage(img);
  img.src = URL.createObjectURL(file);
});

camera.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = "environment";
  input.onchange = (e) => upload.files = e.target.files;
  input.click();
});

function drawFinalFramedImage(img) {
  const gold = "#B3966A";
  const white = "#FFFFFF";
  const blue = "#173D50";

  const goldBorder = 20;
  const whiteBorder = 30;

  const totalWidth = img.width + 2 * (goldBorder + whiteBorder);
  const totalHeight = img.height + 2 * (goldBorder + whiteBorder);

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  // 深藍底
  ctx.fillStyle = blue;
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // 白框
  ctx.fillStyle = white;
  ctx.fillRect(goldBorder, goldBorder, totalWidth - 2 * goldBorder, totalHeight - 2 * goldBorder);

  // 金框 + 圖片
  ctx.fillStyle = gold;
  ctx.fillRect(goldBorder + whiteBorder, goldBorder + whiteBorder, img.width, img.height);
  ctx.drawImage(img, goldBorder + whiteBorder, goldBorder + whiteBorder);
}

download.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "kbk_style_v3.2.png";
  a.click();
});
