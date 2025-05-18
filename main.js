
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.getElementById('upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => drawFiltered(img);
  img.src = URL.createObjectURL(file);
});

function drawFiltered(img) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i+1], data[i+2]];
    const avg = (r + g + b) / 3;
    let newColor;
    if (avg < 85) newColor = [23, 61, 80];         // 深藍
    else if (avg < 170) newColor = [255, 255, 255]; // 白
    else newColor = [179, 150, 106];                // 金黃
    [data[i], data[i+1], data[i+2]] = newColor;
  }

  ctx.putImageData(imageData, 0, 0);
}

function downloadImage() {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'kbk_style_output.png';
  a.click();
}

function startCamera() {
  const input = document.getElementById('upload');
  input.setAttribute('capture', 'environment');
  input.click();
}
