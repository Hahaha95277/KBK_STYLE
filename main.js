const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadLink = document.getElementById("downloadLink");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    const img = new Image();
    img.onload = function () {
      const w = img.width;
      const h = img.height;
      canvas.width = w + 48;
      canvas.height = h + 48;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#B3966A";
      ctx.fillRect(12, 12, canvas.width - 24, canvas.height - 24);

      ctx.drawImage(img, 24, 24, w, h);

      const dataURL = canvas.toDataURL("image/png");
      downloadLink.href = dataURL;
    };
    img.src = URL.createObjectURL(file);
  }
});

function openCamera() {
  fileInput.setAttribute("accept", "image/*");
  fileInput.setAttribute("capture", "environment");
  fileInput.click();
}
