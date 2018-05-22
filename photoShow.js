var pS = {};
//定义一个公共函数来取指定的id，减少代码量，提高代码复用率
pS.$ = function(id) {
    return document.getElementById(id);
};

//定义一个公共函数来取指定的class集合
pS.getElementsByClassName = function(className,element) {
    if(document.getElementsByClassName) {
        return (element||document).getElementsByClassName(className);
    }

    var children = (element||document).getElementsByTagName('*');
    var elements = new Array();

    for(var i=0; i<children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        for(var j=0; j<classNames.length; j++) {
            if(classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
};

//定义监听事件的公共函数和兼容性
pS.addListener = function(target,type,handler) {
    if(target.addEventListener) {
        target.addEventListener(type,handler,false);
    } else if(target.attchEvent) {
        target.attachEvent("on"+type,handler);
    }else {
        target["on"+type]=handler;
    }
};

pS.data = [
    ["photo1.jpg","thumb1.jpg"]
    ,["photo2.jpg","thumb2.jpg"]
    ,["photo3.jpg","thumb3.jpg"]
    ,["photo4.jpg","thumb4.jpg"]
    ,["photo5.jpg","thumb5.jpg"]
    ,["photo6.jpg","thumb6.jpg"]
    ,["photo7.jpg","thumb7.jpg"]
];
pS.showNumber = 0;
pS.groupNumeber = 1;
pS.groupSize = 6;

pS.showThumb = function(group) {
    var ul = pS.$("smallPhotosList");
    ul.innerHTML = '';
    var start=(group-1)*pS.groupSize;
    var end=group*pS.groupSize;
    for(var i=start; (i<end&&i<pS.data.length);i++) {
        var li = document.createElement('li');
        li.innerHTML='<img src="'+pS.data[i][1]+'" id="thumb'+i+'" width="80" height="40"/>';
        (function(i) {
            pS.addListener(li,"click",function(){
                pS.showNumber = i;
                pS.showBig();
            });
        })(i);
        ul.appendChild(li);
    }
};
pS.showBig = function() {
    pS.$("bigPhotoSrc").src = pS.$("thumb"+pS.showNumber).src.replace("thumb", "photo");
};

pS.init = function() {
    pS.showThumb(1);
    pS.addListener(pS.$("next"), "click", function(){
        pS.nextThumb();
    });
    pS.addListener(pS.$("prve"), "click", function(){
        pS.prveThumb();
    });

    pS.addListener(document,"keyup", function(e){
        e = e||event;
        if(e.keyCode===37){
            pS.prvePhoto();
        }
        if(e.keyCode===39){
            pS.nextPhoto();
        }
    });
};

pS.init();

pS.nextThumb = function() {
    if((pS.groupNumeber*pS.groupSize) +1 <= pS.data.length) {
        pS.showThumb(pS.groupNumeber+1);
        pS.showNumber = pS.groupNumeber*pS.groupSize;
        pS.showBig();
        pS.groupNumeber++;
    }
};

pS.prveThumb = function() {
    if(pS.groupNumeber - 1>=1)
    {
        pS.showThumb(pS.groupNumeber-1);
        pS.groupNumeber--;
        pS.showNumber = (pS.groupNumeber-1)*pS.groupSize;
        pS.showBig();
    }
};

pS.nextPhoto = function(){
    if(pS.showNumber%pS.groupSize === (pS.groupSize-1)){
        pS.nextThumb();
    }else if(pS.showNumber<pS.data.length-1){
        pS.showNumber++;
        pS.showBig();
    }
};

pS.prvePhoto = function(){
    if(pS.showNumber === ((pS.groupNumeber-1)*pS.groupSize)){
        pS.prveThumb();
    }else if(pS.showNumber>0){
        pS.showNumber--;
        pS.showBig();
    }
};
