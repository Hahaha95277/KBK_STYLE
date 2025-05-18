
const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");

fileInput.addEventListener("change", handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      drawImageWithFrame(img);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function startCamera() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = "environment";
  input.addEventListener("change", handleFile);
  input.click();
}

function drawImageWithFrame(img) {
  const outerMargin = 60;
  const whiteBorder = 20;
  const goldBorder = 20;

  const width = img.width + goldBorder * 2 + whiteBorder * 2 + outerMargin * 2;
  const height = img.height + goldBorder * 2 + whiteBorder * 2 + outerMargin * 2;

  canvas.width = width;
  canvas.height = height;

  // 深藍底
  ctx.fillStyle = "#173D50";
  ctx.fillRect(0, 0, width, height);

  // 白框
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

  // 金邊
  ctx.fillStyle = "#B3966A";
  ctx.fillRect(outerMargin + whiteBorder, outerMargin + whiteBorder, width - (outerMargin + whiteBorder) * 2, height - (outerMargin + whiteBorder) * 2);

  // 畫圖
  ctx.drawImage(
    img,
    outerMargin + whiteBorder + goldBorder,
    outerMargin + whiteBorder + goldBorder
  );
}

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "kbk-style-v3.4.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
