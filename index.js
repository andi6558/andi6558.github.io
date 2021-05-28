window.onload=function(){

    document.getElementById("id-face").addEventListener("change", function(){      

        onFileChange(this,"face-result","face-empty-result")

    });

    document.getElementsByClassName("btn")[0].addEventListener("click", function(){      

        submit();

    });

};
/**

 * 选中图片时的处理

 * @param {*} fileObj input file元素

 * @param {*} el //选中后用于显示图片的元素ID

 * @param {*} btnel //未选中图片时显示的按钮区域ID

 */


function onFileChange(fileObj,el,btnel){

    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var imgObj = document.getElementById(el);
    document.getElementById(btnel).style.display="none";
    imgObj.style.display="block";
    if (fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
//blob:null/3d4cd713-ab46-460e-a319-edbb6926f48a
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
//        new Image()
        image = document.getElementById('source');
//        image = new Image();
//        img.onload = function (){
//            canvas.width = img.width;
//            canvas.height = img.height;
//            ctx.drawImage(img,0,0);
//        }
//        image.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png'

        image.src = dataURL
        canvas.width = image.width
        canvas.height = image.height
//        ctx.drawImage(image, 0, 0);
        sdsz = new Image();
        sdsz.src = "sdsz2.png"
        ctx.drawImage(sdsz, 0, 0);


//        imgObj.src=compressImageTobase64(fileObj.files[0]);

        imgObj.src=dataURL;

    } else {

        dataURL = fileObj.value;

        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";

        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

    }

}

function compressImageTobase64(image,width,height,qua){

    var quality = qua ? qua / 100 : 0.8;

//    var canvas = document.createElement("canvas"),
//
//        ctx = canvas.getContext('2d');

//    image = document.getElementById('source');

    var canvas = document.getElementById('canvas');

    var ctx = canvas.getContext('2d');

    var w = image.naturalWidth,

        h = image.naturalHeight;

    canvas.width = width||w;

    canvas.height = height||h;



    ctx.drawImage(image, 0, 0, width||w, height||h);

    sdsz = new Image();
    sdsz.setAttribute("crossOrigin", "anonymous");
    sdsz.onload = function() {




    ctx.drawImage(sdsz, 0, 0, width||w, height||h);

    var data = canvas.toDataURL("image/jpeg", quality);
//    var data = canvas.toDataURL();

    console.log(data);
    theResult = document.getElementById('result');

    theResult.src = data;

    }
    sdsz.src = "sdsz3.png"
}

function callback() {
}
//    return windowURL.createObjectURL(data);
//
//}
/**

 * 将图片压缩后返回base64格式的数据

 * @param {*} image img元素

 * @param {*} width 压缩后图片宽度

 * @param {*} height 压缩后图片高度

 * @param {*} qua //图片质量1-100

 */

//function compressImageTobase64(image,width,height,qua){
//
////    var quality = qua ? qua / 100 : 0.8;
//
//    var canvas = document.createElement("canvas"),
//
//        ctx = canvas.getContext('2d');
//
////    var w = image.naturalWidth,
////
////        h = image.naturalHeight;
////
////    canvas.width = width||w;
////
////    canvas.height = height||h;
//
////    var sdsz = new Image();
////
////    sdsz.src = "sdsz2.png"
//
//    ctx.drawImage(image, 0, 0, w, h, 0, 0, width||w, height||h);
//
////    ctx.drawImage(sdsz, 0, 0, w, h, 0, 0, width||w, height||h);
//
//    var data = canvas.toDataURL("image/jpeg", quality);
//
//    return data;
//
//}

//提交

function submit(){
 //1、form提交

    //document.getElementById("mainForm").submit();

    //2、压缩后ajax提交

    compressImageTobase64(document.getElementById("face-result"),300,300,100);
//var face_data=
//    var formData = new FormData();
//
//    formData.append("face",face_data);
//
//    需引入jQuery
//
//    $.ajax({
//
//        url:"/地址",
//
//        type: 'POST',
//
//        cache: false,
//
//        data: formData,
//
//        timeout:180000,
//
//        processData: false,
//
//        contentType: false,
//
//        success:function(r){
//
//        },
//
//        error:function(r){
//
//        }
//
//   });

}