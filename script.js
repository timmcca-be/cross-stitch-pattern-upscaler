const lineThickness = 1;

let pixelSizeInput, previewElement, resultElement;

$(() => {
    pixelSizeInput = $("#pixelSizeInput")
    previewElement = $("#preview");
    resultElement = $("#result");

    $(":file").change(function() {
        if (this.files == null && this.files.length === 0) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            previewElement.attr("src", event.target.result);
            previewElement.attr("alt", "A preview of your uploaded file")
            setTimeout(paint, 0);
        };
        reader.readAsDataURL(this.files[0]);
    });

    pixelSizeInput.change(paint);
});

function paint() {
    const pixelSize = Number.parseInt(pixelSizeInput.val());
    if (Number.isNaN(pixelSize)) {
        return;
    }

    const width = previewElement.width();
    const height = previewElement.height();

    const scaleFactor = pixelSize + lineThickness;
    const scaledImageWidth = width * scaleFactor;
    const scaledImageHeight = height * scaleFactor;
    const canvasWidth = lineThickness + scaledImageWidth;
    const canvasHeight = lineThickness + scaledImageHeight;

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(previewElement[0], lineThickness, lineThickness, scaledImageWidth, scaledImageHeight);

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

    resultElement.attr("src", canvas.toDataURL());
    resultElement.attr("alt", "The cross-stitch pattern based on your uploaded file")
}
