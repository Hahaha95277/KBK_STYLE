const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gold = '#B3966A';
const white = '#FFFFFF';
const dark = '#173D50';

function drawStylized(img) {
  canvas.width = img.width + 80;
  canvas.height = img.height + 80;

  // 外層深藍背景
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 中層金框
  ctx.fillStyle = gold;
  ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);

  // 內層白框
  ctx.fillStyle = white;
  ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);

  // 將圖片繪製到畫布中央，並應用濾鏡效果
  const temp = document.createElement('canvas');
  const tctx = temp.getContext('2d');
  temp.width = img.width;
  temp.height = img.height;
  tctx.drawImage(img, 0, 0);
  const imageData = tctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const brightness = 0.299*r + 0.587*g + 0.114*b;
    if (brightness < 80) {
      data[i] = 23; data[i+1] = 61; data[i+2] = 80;
    } else if (brightness < 180) {
      data[i] = 179; data[i+1] = 150; data[i+2] = 106;
    } else {
      data[i] = 255; data[i+1] = 255; data[i+2] = 255;
    }
  }

  tctx.putImageData(imageData, 0, 0);
  ctx.drawImage(temp, 40, 40);
}

document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => drawStylized(img);
  img.src = URL.createObjectURL(file);
});

function downloadImage() {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'kbk-style.png';
  a.click();
}

function startCamera() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = e => {
    const file = e.target.files[0];
    const img = new Image();
    img.onload = () => drawStylized(img);
    img.src = URL.createObjectURL(file);
  };
  input.click();
}
