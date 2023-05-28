const IMAGE_SOURCE = "https://raw.githubusercontent.com/andi6558/andi6558.github.io/main/watermark2022.png";
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 800;

window.onload = function () {
    let inputElement = document.getElementById("id-face");
    document.getElementById("btn").addEventListener("click", inputElement.click.bind(inputElement));
    document.getElementById("user-uploaded-image").addEventListener("click", inputElement.click.bind(inputElement));
    inputElement.addEventListener("change", function () {
        onFileChange(this, document.getElementById("user-uploaded-image"));
    });
};

/**
 * 选中图片时的处理
 * @param {HTMLElement} inputElement input file元素
 * @param {HTMLImageElement} imageElementId 选中后用于显示图片的元素ID
 */
function onFileChange(inputElement, imageElement) {
    let windowURL = window.URL || window.webkitURL;
    if (inputElement && inputElement.files && inputElement.files[0]) {
        let dataURL = windowURL.createObjectURL(inputElement.files[0]);
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = IMAGE_WIDTH;
        canvas.height = IMAGE_HEIGHT;
        imageElement.onload = function () {
            imageElement.onload = function () {};
            let sdszWatermarkImage = new Image();
            sdszWatermarkImage.setAttribute("crossOrigin", "anonymous");
            sdszWatermarkImage.onload = function () {
                ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(sdszWatermarkImage, 0, 0, canvas.width, canvas.height);
                imageElement.src = canvas.toDataURL();
            };
            sdszWatermarkImage.src = IMAGE_SOURCE;
        }
        imageElement.src = dataURL;
    }
}
