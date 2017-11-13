
// 文件选择
const imgPreview=function(BtnIdSelector,ViewIdSelector){
        function addEvent(node,event,handler){
            if (!!node.addEventListener){
                node.addEventListener(event,handler,!1);
            }else{
                node.attachEvent('on'+event,handler);
            }
        }
        function file2dataurl(file,callback){
            if (!window.FileReader){
                throw 'Browser not support File API !';
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(event){
                callback(event.target.result);
            };
        }
        // 添加预览图片
        function appendImage(url){
            // 添加预览图片容器
            var div = document.createElement('div');
            div.className = 'itbox';
            document.getElementById(ViewIdSelector).appendChild(div);
            // 添加预览图片
            var image = new Image();
            div.appendChild(image);
            image.src = url;
        }
        addEvent(
        document.getElementById(BtnIdSelector),
        'change',function(event){
            if (!event.target){
                throw 'Browser not support!';
            }
            var list = event.target.files;
            if (!list||!list.length){
                return;
            }
            for(var i=0,l=list.length;i<l;i++){
                file2dataurl(list[i],appendImage);
            }
            // event.target.parentNode.reset();
        }
    );
}
export default imgPreview;