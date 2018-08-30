// 第一个轮播图
window.onload = function(){
    banner();
}
var banner = function(){
    // 1、无缝滚动&无缝滑动（定时器、过渡、位移）
    // 2、点盒子对应改变（改变当前样式）
    // 3、可以滑动（touch事件）
    // // 4、当滑动距离不够的时候吸附回去（过渡、位移）
    // 5、当超过一定距离的时候跳转，上一张或者下一张（判断方向、过渡、位移）
    // 获取需要操作的dom元素
    // 大容器
    var banner = document.querySelector(".jd_banner");
    // 轮播图宽度
    var width = banner.offsetWidth;
    // 图片容器
    var imagebox = banner.querySelector("ul:first-child");
    // 点容器
    var pointbox = banner.querySelector("ul:last-child");
    //所有的点
    // var point = pointbox.childNodes;
    var points = pointbox.querySelectorAll('li');

    // 1、无缝滚动&无缝滑动（定时器、过渡、位移）setInterval在执行完一次代码之后，经过了那个固定的时间间隔，它还会自动重复执行代码，而setTimeout只执行一次那段代码。   
    // 提取公用方法
    var addTransition = function(){
            // 增加过渡
        imagebox.style.transition = 'all 0.2s';
        imagebox.style.webkitTransition = "all 0.2s";  //兼容
    }
    var removeTransition = function(){
        // 清除过渡
        imagebox.style.transition = 'none';
        imagebox.style.webkitTransition = "none";  //兼容
    }
    var setTranlateX = function(translatex){
        // 设置位移
        imagebox.style.transform = "translateX("+translatex+"px)";
        imagebox.style.webkitTramsform = "translateX("+translatex+"px)";
    }
    var index = 1;
    var timer = setInterval(function(){
        index ++;
        // 增加过渡
        addTransition();
        //位移
        setTranlateX(-index*width);
    },3000);
    // 怎么监听过渡截止的时间 过渡结束S事件
    imagebox.addEventListener('transitionend',function(){
        // 无缝滚动
        if(index >= 9){
            // 瞬间定位到第一张
            index =1;
            // 先清除过渡，然后在根据index定位
            removeTransition();
            setTranlateX(-index*width);
        }
        // 无缝滑动（定时器、过渡、位移）
        else if(index<=0){
            index = 8;
            removeTransition();
            setTranlateX(-index*width);
        }
        setpoint();
    })

    // 点盒子的样式改变
    var setpoint = function(){
        // index范围1-8
        // 去除所有的样式
        for(var i =0;i<points.length;i++){
            points[i].classList.remove("now");
        }
        // 给对应的加上
        points[index-1].classList.add("now")
    }

    var startX = 0;  //记录开始的X的坐标
    var distanceX = 0;   //记录坐标轴的改变
    // 为了严谨
    var ismove = false;
    // 可以滑动（touch事件  监听触摸点坐标的改变距离 位移）
    imagebox.addEventListener("touchstart",function(e){
        // 在做滑动之前清除定时器
        clearInterval(timer);
        //记录开始的位移
        startX = e.touches[0].clientX;
        // console.log(startX);
    });

    imagebox.addEventListener("touchmove",function(e){
        var moveX =  e.touches[0].clientX;
        distanceX = moveX - startX;
        //当distanceX大于0的时候向右滑动，小于0的时候向左滑动
        // 基于当前的位置来计算定位，而不是用0,0
        var translateX = -index*width +distanceX;
        // // 即时的跟着手指做滑动，因此就不需过渡了
        removeTransition();
        // // 做定位
        setTranlateX(translateX);
        ismove = true;
    });

    // 手指离开屏幕的时候触发
    imagebox.addEventListener("touchend",function(e){
        console.log(distanceX);
        // 滑动事件结束以后来判断当前滑动距离
        // 有一个范围，如果滑动的范围大于三分之一则切换图片，如果小于三分之一则定位回去
        if(ismove){
            if(Math.abs(distanceX)<width/3){
                // 移动距离不够的时候（过渡效果、位移）
                addTransition();
                setTranlateX(-index*width);
            }else{
                //滑动距离够了的时候（切换上一张、下一张）
                if(distanceX>0){
                    // 向右滑，切换到上一张
                    index--;
                }else{
                    // 向左滑
                    index++;
                }
                addTransition();
                setTranlateX(-index*width);
            }
        }
        // 为了严谨，保证只加一次定时器
        clearInterval(timer);
        // 手指离开的时候要加上定时器
        timer = setInterval(function(){
            index ++;
            // 增加过渡
            addTransition();
            //位移
            setTranlateX(-index*width);
        },2000);
        //重置参数，表面滑动结束后对效果产生影响
        startX = 0;
        distanceX = 0;
        ismove = false;
    });



// 第二个轮播图
var mySwiper = new Swiper ('.swiper-container', {
        direction:'horizontal',
        loop: true,
        autoplay:1000,
        speed:2000,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
　　　　  autoplayDisableOnInteraction : false,
        scrollbar: '.swiper-scrollbar',
         pagination: {
      el: '.swiper-pagination',
    },
      });

}

