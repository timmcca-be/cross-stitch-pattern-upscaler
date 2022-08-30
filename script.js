const lineThickness = 1;

function paint() {
    const pixelSize = Number.parseInt($("input[type=number]").val());
    if (Number.isNaN(pixelSize)) {
        return;
    }

    const imageElement = $("img");
    const width = imageElement.width();
    const height = imageElement.height();

    const scaleFactor = pixelSize + lineThickness;
    const scaledImageWidth = width * scaleFactor;
    const scaledImageHeight = height * scaleFactor;
    const canvasWidth = lineThickness + scaledImageWidth;
    const canvasHeight = lineThickness + scaledImageHeight;

    const canvas = $("canvas")[0];
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth + lineThickness, canvasHeight + lineThickness);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(imageElement[0], lineThickness, lineThickness, scaledImageWidth, scaledImageHeight);

    for (let i = 0; i <= width; i++) {
        const x = i * scaleFactor + lineThickness / 2;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let i = 0; i <= height; i++) {
        const y = i * scaleFactor + lineThickness / 2;
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();
}

$(() => {
    $(":file").change(function() {
        if (this.files == null && this.files.length === 0) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            $("img").attr("src", event.target.result);
            setTimeout(paint, 0);
        };
        reader.readAsDataURL(this.files[0]);
    });

    $("input[type=number]").change(paint);
});
