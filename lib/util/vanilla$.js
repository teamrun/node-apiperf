// 使用原生js实现jquery的某些功能


var lib = {
    // 获取某个元素对于end的offset
    // 有可能返回false: el.offsetParent == null, 即el的某个祖先元素的display为none
    getOffset: function(el, end){
        if(end === undefined){
            end = document.body;
        }
        var offset = {
            top: 0,
            left: 0
        };
        while( true ){
            offset.top += el.offsetTop;
            offset.left += el.offsetLeft;
            // webkit & IE >=9 , if fixed, offsetParent == self
            if( el === el.offsetParent ){
                return offset;
            }
            el = el.offsetParent;
            // webkit, if parent display:none, ele.offsetParent === null;
            if(el === null){
                return false;
            }
            if(el === end ){
                return offset;
            }
        }
        return false;
    }
};


module.exports = lib;