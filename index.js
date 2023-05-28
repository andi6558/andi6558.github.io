const IMAGE_SOURCE = "watermark2022.png";
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
    let imageElement = document.getElementById(imageElementId).getElementsByTagName("img")[0];
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

        let sdsz = new Image(); // Andi: 我怀疑这个没有用
        sdsz.src = IMAGE_SOURCE;
        ctx.drawImage(sdsz, 0, 0);

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
    let sdsz = new Image();
    sdsz.setAttribute("crossOrigin", "anonymous");
    sdsz.onload = function () {
        ctx.drawImage(sdsz, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL();
        console.log(data);
        let theResult = document.getElementById("result");
        theResult.src = data;
    };
    sdsz.src = IMAGE_SOURCE;
}

/**
 * Called when the "submit image" button is clicked.
 */
function submit() {
    compressImageTobase64(document.getElementById("watermarked-image"), IMAGE_HEIGHT, IMAGE_WIDTH);
}
