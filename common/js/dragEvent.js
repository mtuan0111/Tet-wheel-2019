var elemRotate = document.getElementById("content");
var movePoint;
var endPoint;
var targetPageArr = new Array('gioithieu','vongquay','ketqua');
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
        // case "mousedown": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
        // case "mousemove":  type = "mousemove"; break;
        case "touchend":   type = "mouseup";   break;
        // case "mouseup":   type = "mouseup";   break;
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

    switch(type)
    {
        case "mousedown":
            firstPoint = first.pageX;
            movePoint = first.pageX;
            elemRotate.className.split(" ").forEach(function(el){
                if(targetPageArr.indexOf(el) != -1){
                    currentPagePos = targetPageArr.indexOf(el);
                }
            });
            break;
        case "mousemove":
            // moveRange = first.pageX - firstPoint;
            // activeRotate = ((Math.abs(moveRange) > 50) && (Math.abs(moveRange) < 150));
            
            // if(activeRotate){
            //     $(elemRotate).css({
            //         '-webkit-transform': "translateX(" + moveRange/3 + "px)",
            //         '-moz-transform': "translateX(" + moveRange/3 + "px)",
            //         '-ms-transform': "translateX(" + moveRange/3 + "px)",
            //         '-o-transform': "translateX(" + moveRange/3 + "px)",
            //         'transform': "translateX(" + moveRange/3 + "px)"
            //     });
            //     // }
            // }
            // movePoint = first.pageX;
          break;
        case "mouseup":
          endPoint = first.pageX;
          moveRange = endPoint - firstPoint;

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

            getHashURLh(window.location.hash);
          $(elemRotate).removeAttr("style");

          break;
        default:
          return;
    }
}

function touchInit() {
    var touchElement = document.body;
    touchElement.addEventListener("touchstart", touchHandler, true);
    // touchElement.addEventListener("mousedown", touchHandler, true);
    touchElement.addEventListener("touchmove", touchHandler, true);
    // touchElement.addEventListener("mousemove", touchHandler, true);
    touchElement.addEventListener("touchend", touchHandler, true);
    // touchElement.addEventListener("mouseup", touchHandler, true);
    touchElement.addEventListener("touchcancel", touchHandler, true);
}

