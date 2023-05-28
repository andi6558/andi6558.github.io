const IMAGE_SOURCE = "https://raw.githubusercontent.com/andi6558/andi6558.github.io/main/watermark2022.png";
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 800;

window.onload = function () {
    document.getElementById("id-face").addEventListener("change", function () {
        onFileChange(this, "user-uploaded-image", "watermarked-image");
    });
    document.getElementsByClassName("btn")[0].addEventListener("click", function () {
        submit();
    });
};

/**
 * 选中图片时的处理
 * @param {HTMLElement} inputElement input file元素
 * @param {string} imageElementId 选中后用于显示图片的元素ID
 * @param {string} buttonElementId 未选中图片时显示的按钮区域ID
 */
function onFileChange(inputElement, imageElementId, buttonElementId) {
    let windowURL = window.URL || window.webkitURL;
    /** @type {HTMLImageElement} */
    let imageElement = document.getElementById(imageElementId);
    console.log(imageElement);
    document.getElementById(buttonElementId).style.display = "none";

    imageElement.style.display = "block";
    if (inputElement && inputElement.files && inputElement.files[0]) {
        let dataURL = windowURL.createObjectURL(inputElement.files[0]);
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let image = document.getElementById("source");
        image.src = dataURL;
        canvas.width = image.width;
        canvas.height = image.height;

        imageElement.src = dataURL;
    } else {
        dataURL = inputElement.value;
        imageElement.style.filter =
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        imageElement.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
    }
}

/**
 * 将图片压缩后返回 base64 格式的数据
 * @param {HTMLImageElement} imageElement img 元素
 * @param {number} width 压缩后图片宽度
 * @param {number} height 压缩后图片高度
 */
function compressImageTobase64(imageElement, width, height) {
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width || imageElement.naturalWidth;
    canvas.height = height || imageElement.naturalHeight;
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    let sdszWatermarkImage = new Image();
    sdszWatermarkImage.setAttribute("crossOrigin", "anonymous");
    sdszWatermarkImage.onload = function () {
        ctx.drawImage(sdszWatermarkImage, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL();
        console.log(data);
        /** @type {HTMLImageElement} */
        let resultImageElement = document.getElementById("result");
        resultImageElement.src = data;
    };
    sdszWatermarkImage.src = IMAGE_SOURCE;
}

/**
 * Called when the "submit image" button is clicked.
 */
function submit() {
    compressImageTobase64(document.getElementById("user-uploaded-image"), IMAGE_HEIGHT, IMAGE_WIDTH);
}
