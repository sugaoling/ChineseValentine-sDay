/**
 * Created by xiaochuan on 2016/8/17.
 */
function BoyWalk() {
    var container=$("#content");
    /*页面可视区域的高度和宽度*/
    var visualWidth=container.width();
    var visualHeight=container.height();
 // alert(visualWidth+"-----"+visualHeight);
    /*定义一个方法获取元素height和top值*/
    var getValue=function (className) {
        var $elem=$(''+className+'');
        return{
            height:$elem.height(),
            top:$elem.position().top
        };
    };
    /*var data=getValue('.a_background_middle');
    var pathY=data.top + data.height/2;*/
    var pathY=function () {
        var data=getValue('.a_background_middle');
        return data.top+data.height/2
    }();
    var  $boy=$('#boy');
    var boyHeight=$boy.height();
    $boy.css({
        top:pathY-boyHeight+25
    });
    //暂停走路
    function pauseWalk() {
        $boy.addClass("pauseWalk");
    }
    function  restoreWalk() {
        $boy.removeClass("pauseWalk");
    }
    /*CSS3的动作变化*/
    function slowWalk() {
        $boy.addClass("slowWalk");
    }
    /*计算移动距离*/
    function  calculateDistance(direction,proportion) {
        return (direction=="x"?visualWidth:visualHeight)*proportion;
    }
    /*用transition做运动*/
    function stratRun(options,runTime) {
        var dfdPlay=$.Deferred();
        restoreWalk();
        $boy.transition(options,runTime,'linear',function () {
            dfdPlay.resolve();
        });
        return dfdPlay;

    }
    /*开始走路*/
    function walkRun(time,disX,disY) {
        time=time||3000;
        slowWalk();
        var d1=stratRun({
            'left':disX+'px',
            'top':disY?disY:undefined
        },time);
       // console.log(d1);
        return d1;
    }
    return {
        //开始走路
        walkTo:function (time,proportionX,proportionY) {
            var distX=calculateDistance('x',proportionX)
            var distY=calculateDistance('y',proportionY)
            return walkRun(time,distX,distY);
        },
        //停止走路
        stopWalk:function () {
            pauseWalk();
        },
        setColor:function (value) {
            $boy.css('background-color',value);
        }


    }
}