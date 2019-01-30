function User() {
    var _this = this;
    _this.gettingData = false;
    _this.getUserInfo(true);
    _this.getUserResult();
}

User.prototype.openLogin = function() {
    var _this = this;
    if (typeof _this.Username !== "undefined") {
        location.hash = "";
        getHashURL();
    }

    _this.getUserInfo(true, function(data) {
        if (!data) {
            if (typeof _this.loginObject == "undefined") {
                _this.loginObject = new loginForm();
                _this.loginForm = _this.loginObject.loginForm;
            }
        } else {
            location.hash = "";
            getHashURL();
        }
    });
};

User.prototype.closeLogin = function() {
    var _this = this;
    setTimeout(function() {
        _this.loginObject.remove();
    });
    delete _this.loginForm;
};

User.prototype.login = function(callback = null) {
    var _this = this;
    _this.clearData();

    username = _this.loginForm.querySelector("[name='lg_Username']").value;
    password = _this.loginForm.querySelector("[name='lg_Password']").value;
    errorMessage = _this.loginForm.querySelector(".errorMessage");

    $.ajax({
        type: "POST",
        url: "/public/index/check-login-ajax",
        data: { lg_Username: username, lg_Password: password },
        success: function(data) {
            if (data == "1") {
                // urlClean = location.href.substr(0, window.location.href.indexOf('#'));
                // window.location = urlClean;
                location.hash = "";
                getHashURL();
                _this.getUserInfo(true);

                _this.removeLoginForm();
            } else {
                errorMessage.innerHTML = data;
                $(errorMessage).slideDown();
            }
            if (callback) {
                callback(data);
            }
        },
        error: function(error) {}
    }).fail(function() {
        _this.failConnection();
    });
};

User.prototype.logOut = function() {
    var _this = this;
    $.ajax({
        type: "POST",
        url: "/public/index/logout/source/goldenwheel2019",
        success: function(data) {
            logoutMessage = "Hẹn gặp lại " + _this.UserName + "!";
            new notificationMessage(logoutMessage, "Đăng xuất");
            wheel.resetState();
        }
    }).done(function() {
        // var urlClean = location.href.substr(0, window.location.href.indexOf('#'));
        // window.location = urlClean;
        location.hash = "";
        getHashURL();
        _this.getUserInfo();
        _this.clearData();
    });
};

User.prototype.getUserInfo = function(afterLogin = false, callback = null) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: "getUserInfo.php",
        data: { request: "1" },
        dataType: "json",
        success: function(data) {
            mainNav.topNav = mainNav.create(data);
            if (data) {
                _this.UserName = data.UserName;
                _this.Point = data.Point ? data.Point : 0;
                if (afterLogin) {
                    welcomeMessage =
                        'một năm Kỷ Hợi<br> <strong>An Khang Thịnh Vượng</strong><br>\
                        Click vào vòng quay để quay bạn nhé!<br>\
                        Xem <a href="#thele">thể lệ</a>.';
                    new notificationMessage(
                        welcomeMessage,
                        "Chúc " + _this.UserName,
                        10
                    );
                }
            } else {
                if (afterLogin) {
                    welcomeMessage =
                        'Chúc bạn một năm Kỷ Hợi<br> <strong>An Khang Thịnh Vượng</strong><br>\
                    Bạn hãy <a href="#dangnhap">đăng nhập</a> để tham gia quay nhé<br>\
                    Xem <a href="#thele">Thể lệ</a>';
                    new notificationMessage(welcomeMessage, "Chào bạn", 10);
                }
            }
            if (callback) {
                callback(data);
            }
        }
    }).fail(function() {
        _this.failConnection();
    });
};

User.prototype.getUserWheelInfo = function() {
    var _this = this;
    $.ajax({
        type: "POST",
        url: "getUserInfo.php",
        data: { request: "2" },
        dataType: "json",
        success: function(data) {
            if (data) {
                _this.numRound = data.numRound;
                _this.totalPoint = data.totalPoint ? data.totalPoint : 0;
                if (_this.numRound) {
                    messageRound =
                        "Hôm nay bạn đã hết lượt quay rồi. Hãy ghé lại vào ngày mai bạn nhé!";
                } else {
                    _this.totalPoint = data.totalPoint ? data.totalPoint : 0;
                    messageRound =
                        "Hôm nay bạn đã chưa tham gia quay. Hãy bấm vào vòng quay để quay bạn nhé!";
                }
                messageRound +=
                    '<br>Tổng số điểm bạn nhận được "Vòng quay may mắn" là ' +
                    _this.totalPoint +
                    " điểm.";
                new notificationMessage(messageRound, _this.UserName);
            }
        }
    }).fail(function() {
        _this.failConnection();
    });
};

User.prototype.getUserResult = function() {
    var _this = this;
    $.ajax({
        type: "POST",
        url: "getUserInfo.php",
        dataType: "json",
        data: { request: "3" },
        success: function(data) {
            if (data) {
                var dataArray = [];
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    if (!row.current) {
                        dataArray.push([
                            i + 1,
                            row.UserName,
                            row.total,
                            row.timestamp
                        ]);
                    } else {
                        dataArray.push([
                            i + 1,
                            row.UserName,
                            row.total,
                            row.timestamp,
                            row.current
                        ]);
                    }
                }
                new resultTableBroad(dataArray);
            }
        }
    }).fail(function() {
        _this.failConnection();
    });
};

User.prototype.getPlay = function(callback = null) {
    var _this = this;
    if (_this.gettingData == false) {
        _this.gettingData = true;
        $.ajax({
            type: "POST",
            url: "/public/api-campaign/tet-wheel-2019/ajax-get-lucky-number",
            dataType: "json"
        })
            .done(function(data) {
                error = data.error;
                value = data.data;
                if (error == 0 && callback) {
                    callback(data);
                } else {
                    if (error == 3) {
                        var loginMessage =
                            'Bạn cần <a href="#dangnhap">đăng nhập</a> để quay.<br>\
                            Bạn chưa có tài khoản Vinaresearch?<br>\
                            <a class="registerBtn" href="https://vinaresearch.net/" target="_blank">Đăng ký ngay</a>';
                        new notificationMessage(loginMessage);
                    } else new notificationMessage(value);
                }
            })
            .always(function() {
                _this.gettingData = false;
            })
            .fail(function() {
                _this.failConnection();
            });
    }
};

User.prototype.getUserFriendList = function() {
    var _this = this;
    $.ajax({
        type: "POST",
        url: "getUserInfo.php",
        data: { request: "4" },
        dataType: "json",
        success: function(data) {
            if (data) {
                var dataArray = [];
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];

                    dataArray.push([i + 1, row.UserName, row.email]);
                }

                if (typeof _this.friendListObject == "undefined") {
                    _this.friendListObject = new friendList(dataArray);
                } else {
                    _this.friendListObject.drawData(dataArray);
                }
            }
        }
    }).fail(function() {
        _this.failConnection();
    });
};

User.prototype.failConnection = function() {
    errorMessage = "Bạn đang có sự số kết nối, vui lòng thử lại.";
    new notificationMessage(errorMessage);
};

User.prototype.clearData = function() {
    var _this = this;
    delete _this.UserName;
    delete _this.Point;
    // delete _this.gettingData;
    // delete _this.loginForm;
    delete _this.numRound;
    delete _this.totalPoint;
    _this.removeResultBroad();
};

User.prototype.removeLoginForm = function() {
    var _this = this;

    if (typeof _this.loginObject !== "undefined") {
        $(_this.loginObject.loginBroad).fadeOut(function() {
            this.remove();
            delete _this.loginObject;
            delete _this.loginForm;
        });
    }
};

User.prototype.removeResultBroad = function() {
    var _this = this;
    if (typeof _this.friendListObject !== "undefined") {
        $(_this.friendListObject.friendListBroad).fadeOut(function() {
            this.remove();
            delete _this.friendListObject;
        });
    }
};

User.prototype.addPoint = function(Point) {
    var _this = this;
    _this.recentyAdded = Point;
    _this.Point = parseInt(_this.Point) + Point;
    mainNav.addPoint(Point);
};
