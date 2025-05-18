
const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            drawStyledImage(img);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function drawStyledImage(img) {
    const cw = canvas.width;
    const ch = canvas.height;
    const padding = 20;
    const borderWidth = 30;
    const gold = '#B3966A';
    const white = '#FFFFFF';

    // Clear canvas
    ctx.clearRect(0, 0, cw, ch);

    // Outer gold rounded border
    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.moveTo(padding + 10, padding);
    ctx.lineTo(cw - padding - 10, padding);
    ctx.quadraticCurveTo(cw - padding, padding, cw - padding, padding + 10);
    ctx.lineTo(cw - padding, ch - padding - 10);
    ctx.quadraticCurveTo(cw - padding, ch - padding, cw - padding - 10, ch - padding);
    ctx.lineTo(padding + 10, ch - padding);
    ctx.quadraticCurveTo(padding, ch - padding, padding, ch - padding - 10);
    ctx.lineTo(padding, padding + 10);
    ctx.quadraticCurveTo(padding, padding, padding + 10, padding);
    ctx.closePath();
    ctx.fill();

    // Inner white frame
    ctx.fillStyle = white;
    ctx.fillRect(padding + borderWidth, padding + borderWidth, cw - 2 * (padding + borderWidth), ch - 2 * (padding + borderWidth));

    // Draw image
    ctx.drawImage(img, padding + borderWidth, padding + borderWidth, cw - 2 * (padding + borderWidth), ch - 2 * (padding + borderWidth));
}

function startCamera() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = handleImageUpload;
    input.click();
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'kbk_style_v3.5.png';
    link.href = canvas.toDataURL();
    link.click();
}
