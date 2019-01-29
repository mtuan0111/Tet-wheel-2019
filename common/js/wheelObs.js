function Wheel() {
    var _this = this;
    _this.wheel = document.getElementById("wheelArea");
    _this.rotateObject = document.getElementById("wheelRotate");
    _this.rotateWings = _this.rotateObject.getElementsByClassName("wheel-wing");
    _this.pointer = _this.wheel.getElementsByClassName("pointer")[0];

    _this.rotating = false;
    _this.selected = null;

    points_array = [
        1,
        1,
        1,
        1,
        1,
        1,
        5,
        5,
        5,
        5,
        20,
        20,
        20,
        30,
        30,
        50,
        50,
        300,
        300,
        1000
    ];

    // var points_array = [1, 21, 1, 5, 1, 100, 1, 20, 5, 30, 1, 20,1, 5, 500, 5, 1, 30,  1, 50];
    _this.shuffleArray = shuffle(points_array);

    _this.bindingPoint = function() {
        for (i = 0; i < this.shuffleArray.length; i++) {
            var point_value = this.shuffleArray[i];
            _this.rotateWings[i].setAttribute("data-point-value", point_value);
        }
    };
    _this.bindingPoint();
    _this.clickToPlay();
}

Wheel.prototype.rotate = function(point_value = "") {
    var _this = this;
    var elem = $(_this.rotateObject)
        .stop(true, false)
        .removeClass("autoWheel");
    var current_deg = get_current_rotate(elem[0]);

    var point_peace = 0;
    point_peace = getRandomIntInclusive(0, _this.shuffleArray.length);
    if (point_value != "") {
        while (point_value !== _this.shuffleArray[point_peace]) {
            point_peace = getRandomIntInclusive(
                0,
                _this.shuffleArray.length - 1
            );
        }
    }
    point_value = _this.shuffleArray[point_peace];
    $(_this.rotateWings).removeClass("active");
    $(_this.selected).removeClass("active");
    _this.selected = _this.rotateWings[point_peace];
    var loop = getRandomIntInclusive(8, 10);
    var random_pointer = getRandomIntInclusive(-6, 6);
    var rotate_duration = getRandomIntInclusive(10000, 12000);
    var horizontal_deg = 0;
    var number_of_point = _this.shuffleArray.length;
    var rotate_each_point = 360 / number_of_point;
    var deg_rotate =
        loop * 360 +
        point_peace * -rotate_each_point +
        random_pointer +
        horizontal_deg;
    _this.rotating = true;

    $(_this.wheel).addClass("rotating");
    setTimeout(function() {
        $(_this.wheel).removeClass("rotating");
    }, rotate_duration / 1.5);

    $({ deg: current_deg }).animate(
        { deg: deg_rotate },
        {
            duration: rotate_duration,
            // duration: 0,
            easing: "easeOutQuart",
            specialEasing: "easeOutQuart",
            step: function(now) {
                nowe = now % 360;
                // if(activePeace < 0){
                var activePeace = Math.round(
                    (360 - nowe) / rotate_each_point +
                        horizontal_deg / rotate_each_point
                );
                activePeace =
                    activePeace < 0
                        ? number_of_point + activePeace
                        : activePeace;
                $(_this.rotateWings).removeClass("active");
                $(_this.rotateWings[activePeace]).addClass("active");

                pointerRotate =
                    -(nowe % number_of_point) + rotate_each_point / 2;
                // console.log(pointerRotate + ">" + -(rotate_each_point / 2));
                if (pointerRotate < -rotate_each_point / 4) {
                    pointerRotate = pointerRotate;
                } else pointerRotate = 0;

                pointerRotate = pointerRotate * 2 - 135;
                $(_this.pointer).css({
                    "-webkit-transform":
                        "translate(-50%, -100%) rotate(" +
                        pointerRotate +
                        "deg)",
                    "-moz-transform":
                        "translate(-50%, -100%) rotate(" +
                        pointerRotate +
                        "deg)",
                    "-ms-transform":
                        "translate(-50%, -100%) rotate(" +
                        pointerRotate +
                        "deg)",
                    "-o-transform":
                        "translate(-50%, -100%) rotate(" +
                        pointerRotate +
                        "deg)",
                    transform:
                        "translate(-50%, -100%) rotate(" +
                        pointerRotate +
                        "deg)"
                });

                $(elem).css({
                    "-webkit-transform": "rotate(" + nowe + "deg)",
                    "-moz-transform": "rotate(" + nowe + "deg)",
                    "-ms-transform": "rotate(" + nowe + "deg)",
                    "-o-transform": "rotate(" + nowe + "deg)",
                    transform: "rotate(" + nowe + "deg)"
                });
            },
            done: function() {
                var sharePointButton = document.createElement("a");
                sharePointButton.href = "#";
                sharePointButton.className = "sharePoint";
                sharePointButton.innerHTML = "Chia sẻ lên Facebook!";

                console.log(sharePointButton.outerHTML);

                var messageNotifi =
                    "Bạn đã nhận được <strong>" +
                    point_value +
                    " điểm</strong> từ vòng quay.";

                messageNotifi += "<br>" + sharePointButton.outerHTML;

                User.addPoint(point_value);

                // User.getUserInfo();

                new notificationMessage(messageNotifi, "Xin chúc mừng", 10);
                $(_this.selected).addClass("active");

                setTimeout(function() {
                    _this.rotating = false;
                    // $(_this.rotateWings).removeClass("active");
                }, 1000);

                // var current_deg = get_current_rotate(elem[0]);
                $({ deg: deg_rotate }).animate(
                    { deg: deg_rotate - random_pointer },
                    {
                        duration: 1000,
                        easing: "easeOutQuart",
                        specialEasing: "easeOutQuart",
                        step: function(now) {
                            nowe = now % 360;
                            //   pointerRotate = -(nowe % number_of_point) - rotate_each_point / 2;
                            //   console.log(pointerRotate + ">" + -(rotate_each_point / 2));
                            pointerRotate =
                                -(nowe % number_of_point) +
                                rotate_each_point / 2;
                            // console.log(pointerRotate + ">" + -(rotate_each_point / 2));
                            if (pointerRotate < -rotate_each_point / 2) {
                                pointerRotate = pointerRotate;
                            } else pointerRotate = 0;

                            pointerRotate = pointerRotate * 2 - 135;
                            $(_this.pointer).css({
                                "-webkit-transform":
                                    "translate(-50%, -100%) rotate(" +
                                    pointerRotate +
                                    "deg)",
                                "-moz-transform":
                                    "translate(-50%, -100%) rotate(" +
                                    pointerRotate +
                                    "deg)",
                                "-ms-transform":
                                    "translate(-50%, -100%) rotate(" +
                                    pointerRotate +
                                    "deg)",
                                "-o-transform":
                                    "translate(-50%, -100%) rotate(" +
                                    pointerRotate +
                                    "deg)",
                                transform:
                                    "translate(-50%, -100%) rotate(" +
                                    pointerRotate +
                                    "deg)"
                            });

                            elem.css({
                                "-webkit-transform": "rotate(" + now + "deg)",
                                "-moz-transform": "rotate(" + now + "deg)",
                                "-ms-transform": "rotate(" + now + "deg)",
                                "-o-transform": "rotate(" + now + "deg)",
                                transform: "rotate(" + now + "deg)"
                            });
                        }
                    }
                );
            }
        }
    );
};

Wheel.prototype.clickToPlay = function(point_value = "") {
    var _this = this;
    $(document).on("click", "#wheelRotate, .campaignIcon", function() {
        location.hash = "vongquay";
        getHashURL();
        if (!_this.rotating) {
            _this.getPointAndPlay();
        }
    });
};

Wheel.prototype.getPointAndPlay = function() {
    var _this = this;
    // _this.rotate();
    User.getPlay(function(data) {
        if (data.error == 0) {
            _this.rotate(data.data);
        }
    });
};

Wheel.prototype.resetState = function() {
    var _this = this;
    $(_this.rotateObject).addClass("autoWheel");
    $(_this.rotateWings).removeClass("active");
};

function get_current_rotate(el) {
    // var el = document.getElementById(id);
    var st = window.getComputedStyle(el, null);
    var tr =
        st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";

    // With rotate(30deg)...
    // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    // console.log('Matrix: ' + tr);

    // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
    if (tr !== "none") {
        var values = tr
            .split("(")[1]
            .split(")")[0]
            .split(",");
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + c * c);

        // arc sin, convert from radians to degrees, round
        var sin = c / scale;
        // next line works for 30deg but not 130deg (returns 50);
        // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
        var angle = Math.round(Math.atan2(c, a) * (180 / Math.PI));

        // console.log('Rotate: ' + angle + 'deg');
        return angle;
    } else return 0;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
