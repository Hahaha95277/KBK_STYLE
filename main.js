const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

upload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;

    // 建立圓角剪裁區域
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    roundRect(ctx, 0, 0, width, height, 16);
    ctx.clip();

    // 畫原圖
    ctx.drawImage(img, 0, 0);

    // 濾鏡效果處理
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i+1] + data[i+2]) / 3;
      if (avg > 200) {
        data[i] = 255; data[i+1] = 255; data[i+2] = 255;
      } else if (avg > 120) {
        data[i] = 245; data[i+1] = 214; data[i+2] = 143;
      } else {
        data[i] = 10; data[i+1] = 47; data[i+2] = 74;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();

    // 畫外框
    ctx.strokeStyle = '#f5d68f';
    ctx.lineWidth = 8;
    roundRect(ctx, 0, 0, width, height, 16);
    ctx.stroke();
  };
  img.src = URL.createObjectURL(file);
});

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'kbk-style-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
