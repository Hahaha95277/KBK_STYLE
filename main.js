const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply KBK-style color filter: white, gold, dark teal
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const avg = (r + g + b) / 3;

      if (avg > 200) {
        // white
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else if (avg > 120) {
        // gold
        data[i] = 245;
        data[i + 1] = 214;
        data[i + 2] = 143;
      } else {
        // dark teal
        data[i] = 0;
        data[i + 1] = 44;
        data[i + 2] = 43;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  img.src = URL.createObjectURL(file);
});
