// ref https://github.com/WICG/EventListenerOptions/pull/30
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
//解决移动端android4.4+  ios 不能点击
function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
        var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
        return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}


var myScroll;

function loaded () {
    myScroll = new IScroll('#wrapper', {
        click:iScrollClick(), //调用判断函数
        bounceEasing: '',
        bounceTime: 600
    });
}
// function loaded () {
//     myScroll = new IScroll('#box', { bounceEasing: '', bounceTime: 600 });
// }



document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    capture: false,
    passive: false
} : false);