// 关于cssjs
// js提取样式值
// 实现某些css规则
// 计算图形

var cssjs = {
    getPixelVal: function(str){
        return parseInt(str.substr(0, str.length-2));
    },
    // 没有中心化...?
    fitImg: function(img, el, callback){
        function fit(img){
            var h = img.naturalHeight;
            var w = img.naturalWidth;
            var elStyle = window.getComputedStyle(el);
            var W = getPixelVal(elStyle.width);
            var H = getPixelVal(elStyle.height);
            var rate = W/w;
            var h_1 = h * rate;
            if( h_1 >= H ){
                var imgSize = {
                    w: W,
                    h: h_1
                };
            }
            else{
                rate = H/h;
                var w_1 = w * rate;
                var imgSize = {
                    w: w_1,
                    h: H
                };
            }
            img.style.height = imgSize.h + 'px';
            img.style.width = imgSize.w + 'px';
            img.style.marginTop = (H - imgSize.h)/2 + 'px';
            img.style.marginLeft = (W - imgSize.w)/2 + 'px';

            setTimeout(function(){
                callback(img, el);
            }, 0);
        }
        if(img.complete){
            fit(img);
        }
        else{
            img.onload = function(){
                fit(img);
            }
        }
    },

    // @params: eles, cord
    // 同心圆
    concentriCircles: function(){
        var args = [].splice.call(arguments, 0);
        // console.log(args);
        var cirEles, cord;
        // 如果传的是一个数组(元素) 一个对象(坐标)
        if(Array.isArray(args[0]) && ( !isNaN(args[1].x) && !isNaN(args[1].y) ) ){
            cirEles = args[0], cord = args[1]
        }
        else{
            cord = args[args.length-1], cirEles = args.splice(0,args.length-1);
        }

        cirEles.forEach(function(ele){
            posCenter(ele, cord);
        });
    },
    
    // 将ele的中心定位在某个指定坐标
    posCenter: function(ele, cord){
        var s = window.getComputedStyle(ele);
        var allW, allH;
        var g = getPixelVal;
        if(s.boxSizing == 'border-box'){
            allW = getPixelVal(s.width);
            allH = getPixelVal(s.height);
        }
        else{
            allW = g(s.width) + g(s.borderLeftWidth) + g(s.borderRightWidth);
            allH = g(s.height) + g(s.borderTopWidth) + g(s.borderBottomWidth);
        }
        var left = (cord.x - allW)/2;
        var top = (cord.y - allH)/2;

        //console.log(left, ',', top);
        ele.style.top = top + 'px';
        ele.style.left = left + 'px';
    },

    // 获取两个点连线的长度
    getLengthByCord: function(cord1, cord2){
        var a = cord2.x - cord1.x, b = cord2.y - cord1.y;
        return Math.sqrt(a*a + b*b);
    },
    // 获取一个点到一个矩形的四个点的距离
    // 可以看做是通过这个点的水平线和竖直线 将这个矩形分隔成四个矩形, 求着四个对角线
    getFourDiagonal: function getFourDiagonal(cord, rectSize){
        /*
            A -------------- B
              |            |
              |            |
              |   *        |
              |            |
            D -------------- C
        */
        var A = {x: 0, y:0}, B = {x: rectSize.width, y:0};
        var C = {x: rectSize.width, y:rectSize.height}, D = {x: 0, y:rectSize.height};
        var getLengthByCord = cssjs.getLengthByCord;
        return {
            a: getLengthByCord(cord, A),
            b: getLengthByCord(cord, B),
            c: getLengthByCord(cord, C),
            d: getLengthByCord(cord, D)
        }
    }
};


module.exports = cssjs;