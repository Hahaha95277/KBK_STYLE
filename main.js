const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.onload = () => drawFilteredImage(img);
    img.src = URL.createObjectURL(file);
  }
});

function openCamera() {
  upload.setAttribute('capture', 'environment');
  upload.click();
}

function drawFilteredImage(img) {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    let r = d[i], g = d[i+1], b = d[i+2];
    let v = (r + g + b) / 3;
    if (v > 220) {
      d[i] = d[i+1] = d[i+2] = 255;
    } else if (v > 128) {
      d[i] = 179; d[i+1] = 150; d[i+2] = 106;
    } else {
      d[i] = 23; d[i+1] = 61; d[i+2] = 80;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  drawRoundedBorder();
}

function drawRoundedBorder() {
  const borderColor = '#B3966A';
  const thickness = 30;
  ctx.lineJoin = "round";
  ctx.lineWidth = thickness;
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(thickness / 2, thickness / 2, canvas.width - thickness, canvas.height - thickness);
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'kbk-style-v3.1.jpg';
  link.href = canvas.toDataURL('image/jpeg');
  link.click();
}
