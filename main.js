
function startCamera() {
    alert('這是假的示範，實際功能由裝置支援');
}
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'kbk_style_image.png';
    link.href = canvas.toDataURL();
    link.click();
}
document.getElementById('upload').addEventListener('change', function (e) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // 模擬濾鏡處理
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = '#B3966A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    img.src = URL.createObjectURL(e.target.files[0]);
});
