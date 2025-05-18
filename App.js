
export default function App() {
  const canvasRef = React.useRef();

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => drawFilteredImage(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const drawFilteredImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.fillStyle = "#1E3D4C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const brightness = (r + g + b) / 3;

      if (brightness > 200) {
        data[i] = 255; data[i + 1] = 248; data[i + 2] = 229;
      } else if (brightness > 100) {
        data[i] = 212; data[i + 1] = 169; data[i + 2] = 94;
      } else {
        data[i] = 30; data[i + 1] = 61; data[i + 2] = 76;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    ctx.strokeStyle = "#D4A95E";
    ctx.lineWidth = 20;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  };

  return React.createElement("div", { style: { textAlign: "center", padding: 20, background: "#1E3D4C", minHeight: "100vh", color: "#FFF" } },
    React.createElement("h1", { style: { color: "#D4A95E" } }, "KBK STYLE"),
    React.createElement("input", { type: "file", onChange: handleUpload }),
    React.createElement("div", { style: { marginTop: 20, background: "#FFF", padding: 10, borderRadius: 10, border: "4px solid #D4A95E" } },
      React.createElement("canvas", { ref: canvasRef, style: { borderRadius: 8, maxWidth: "100%" } })
    )
  );
}
