$(document).ready(function(){
    var _this = this;
    var hashPage = window.location.hash.split("#")[1];
    hashPage = !hashPage?"C":hashPage;
    var currentPage = hashPage;
    if (hashPage){
        var targetPage = $("#circle-world .page-" + hashPage)[0];
        if(targetPage){
            $("#circle-world").removeClass((currentPage == hashPage)?"":currentPage).addClass(hashPage);
        };
    }

    $(document).on("click",".bottomMenu a",function(){
        var page_target = $(this).data('page-target')
        $("#circle-world").removeClass((currentPage == page_target)?"":currentPage).addClass(page_target);
        currentPage = page_target;
    });

    touchInit();
})

$(window).load(function(){
    var wheel = new Wheel();
    wheel.clickToPlay();
    // var notiBroad = new notificationBroad($(".broad-obs.small"));
    // var notiBroad = new notificationBroad($(".broad-obs"));
    var loginBroad;
    $(document).on("click",".loginButton",function(e){
        if(!loginBroad){
            loginBroad = new notificationBroad();
            loginBroad.setLoginForm();
        }else{
            $(loginBroad.loginUser.loginForm).submit();
        }
        // console.log("loginBroad: ", loginBroad);
        loginBroad.showLoginForm();
        e.stopPropagation()
    });

    $(".wrapper-loading").fadeOut(300,function(){
        $(this).remove();
    });
})
function get_current_rotate(id) {
    var el = document.getElementById(id);
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";
    if (tr !== "none") {
        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);
        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        return angle;
    } else
     return 0;
};


var elemRotate = document.getElementById("circle-world");
var currentDeg;
var firstDeg;
var startPoint;
var movePoint;
var endPoint;
var targetPageArr = new Array('N','C','S');
var currentPagePos;
var activeRotate = false;
function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // Default intruction
    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);


    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    // event.preventDefault();

    switch(type)
    {
        case "mousedown":
            activeRotate = false;
            currentDeg = get_current_rotate("circle-world");
            firstDeg = currentDeg;
            firstPoint = first.pageX;
            movePoint = first.pageX;
            elemRotate.className.split(" ").forEach(function(el){
                if(targetPageArr.indexOf(el) != -1){
                    currentPagePos = targetPageArr.indexOf(el);
                }
            });
            break;
        case "mousemove":
            var moveRange = Math.abs(first.pageX - firstPoint);
            activeRotate = ((moveRange > 100) && (moveRange < 150));
            if(activeRotate){
                currentDeg += (first.pageX - movePoint);
                // console.log("firstDeg: ", firstDeg);
                // console.log("currentDeg: ", currentDeg);
                // console.log("currentDeg - firstDeg: ", Math.abs(currentDeg - firstDeg));
                if(Math.abs(currentDeg - firstDeg) < 15){
                    $(elemRotate).css({
                        '-webkit-transform': "rotate(" + currentDeg + "deg)",
                        '-moz-transform': "rotate(" + currentDeg + "deg)",
                        '-ms-transform': "rotate(" + currentDeg + "deg)",
                        '-o-transform': "rotate(" + currentDeg + "deg)",
                        'transform': "rotate(" + currentDeg + "deg)"
                    });
                }
            }
            movePoint = first.pageX;
          break;
        case "mouseup":
          endPoint = first.pageX;
          var moveRange = endPoint - firstPoint;
          if (moveRange < -150){
            var targetPage = targetPageArr[currentPagePos + 1];
            if(targetPage){
                $(".bottomMenu a[data-page-target="+ targetPage +"]").click();
            }
          }else if (moveRange > 150){
            var targetPage = targetPageArr[currentPagePos - 1];
            if(targetPage){
                $(".bottomMenu a[data-page-target="+ targetPage +"]").click();
            }
          }
          if (targetPage)
              window.location.hash = targetPage;
          $(elemRotate).removeAttr("style");

          break;
        default:
          return;
    }
}

function touchInit() {
    var touchElement = document.body;
    touchElement.addEventListener("touchstart", touchHandler, true);
    touchElement.addEventListener("touchmove", touchHandler, true);
    touchElement.addEventListener("touchend", touchHandler, true);
    touchElement.addEventListener("touchcancel", touchHandler, true);
}