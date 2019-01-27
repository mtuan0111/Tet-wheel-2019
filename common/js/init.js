var User = new User();
var mainNav = new mainNavigate();
var wheel = new Wheel();
var player = document.getElementById("video");

window.onload = function() {
  touchInit();
  getHashURL();
  window.loadDone();

  $(document).on(
    "click",
    '.pageNav a, a[href="#dangnhap"], a[href="#thele"], a[href="#dangnhap"]',
    function(e) {
      if (window.mobilecheck()) {
        $("footer .pageNav")
          .stop(true, false)
          .slideUp();

        $(".btnToggle").toggleClass("active");
      }
      if (!wheel.rotating) {
        getHashURLh(this.getAttribute("href"));
      } else {
        var messageNotifi = "Bạn hãy chờ vòng quay quay xong nhé";

        // User.getUserInfo();

        new notificationMessage(messageNotifi);
        e.preventDefault();
      }
      e.stopPropagation();
    }
  );

  $(document).on("click", ".btnToggle", function(e) {
    if (window.mobilecheck()) {
      $("footer .pageNav")
        .stop(true, false)
        .slideToggle();

      $(this).toggleClass("active");
    }
    e.preventDefault();
    return;
  });

  // paralax setting
  // var scene = document.getElementById('content');
  // var parallax = new Parallax(scene);
};

// Inject YouTube API script
// var tag = document.createElement('script');
// tag.src = "//www.youtube.com/player_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// window.onYouTubePlayerAPIReady = function() {
//     // create the global player from the specific iframe (#video)
//     player = new YT.Player('video', {
//         events: {
//             // call this function when player is ready to use
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange,
//         }
//     });
// }

// function onPlayerReady(event) {

//     if(typeof(player) == "undefined"){
//         return;
//     }

//     if(typeof(player.playVideo) !== "undefined"){
//         player.playVideo();
//                 console.log("play video");
//     }
// }

// function onPlayerPause(event){

//     if(typeof(player) == "undefined"){
//         return;
//     }

//     if(typeof(player.stopVideo) !== "undefined"){
//         player.stopVideo();
//                 console.log("stop video");
//     }
// }

// function onPlayerStateChange(event) {
//     if(event.data === 0) {
//         console.log('done');
//     }
//     console.log("change");
// }

window.onresize = function(event) {
  $("footer .pageNav")[0].removeAttribute("style");
};

function getHashURLh(hash) {
  if (wheel.rotating) {
    return;
  }

  var hashPage = hash.replace("#", "");
  var page = document.getElementById("content");
  page.className = hashPage;

  if (!window.checkIphone() && player) {
    player.pause();
  }

  if (hashPage != "dangnhap") {
    User.removeLoginForm();
  }

  switch (hashPage) {
    case "gioithieu":
      // $("#introBroad").scrollTop($("#introBroad video").offset().top);
      // setTimeout(function() {
      //     player.play();
      // }, 1000);
      break;
    case "ketqua":
      resultTable = document.getElementById("resultBroad");
      User.getUserResult();
      // new notificationMessage("Bạn đang có xxx vòng quay.\n Bạn đã đạt xxx điểm từ vòng quay bạn bè.","Username");
      break;
    case "dangxuat":
      User.logOut();
      break;
    case "thongtin":
      User.getUserWheelInfo();
      break;
    case "dangnhap":
      User.openLogin();
      break;
    case "danhsach":
      User.getUserFriendList();
      break;
    default:
      break;
  }
  return hashPage;
}

function getHashURL(url = window.location) {
  var hashPage = url.hash.replace("#", "");
  getHashURLh(hashPage);
  return hashPage;
}

window.mobilecheck = function() {
  var check = false;
  mobileWidthCheck = window.screen.width <= 800;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  window.checkIphone();
  checkOrientation = window.innerWidth < window.innerHeight;
  return (check || mobileWidthCheck) && checkOrientation;
};

window.checkIphone = function() {
  IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (
    navigator.platform == "iPad" ||
    navigator.platform == "iPhone" ||
    navigator.platform == "iPod"
  ) {
    $(".btnToggle")
      .css("position", "fixed")
      .css("top", $("window").height());
  }
  return IOS && window.mobilecheck();
};

window.loadDone = function() {
  loadingElement = document.getElementById("loadingProcess");
  $(loadingElement).slideUp(500, function() {
    $(this).remove();
  });
};
