function User() {
    var _this = this;
    _this.gettingData = false;
    _this.getUserInfo(true);
    _this.getUserResult();
}

User.prototype.openLogin = function() {
    var _this = this;
    console.log("openLogin: ");
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
    console.log("closeLogin: ");
    setTimeout(function() {
        _this.loginObject.remove();
    });
    delete _this.loginForm;
};

User.prototype.login = function(callback = null) {
    var _this = this;
    console.log("login: ");
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
        error: function(error) {
            console.log(error);
        }
    }).fail(function() {
        _this.failConnection();
    });
};

User.prototype.logOut = function() {
    var _this = this;
    $.ajax({
        type: "POST",
        url: "/public/index/logout/source/friendwheel",
        success: function(data) {
            logoutMessage = "Hẹn gặp lại " + _this.UserName + "!";
            new notificationMessage(logoutMessage);
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
    console.log("getUserInfo: ");
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
                        "Xin chào " +
                        _this.UserName +
                        ",<br>Hãy <a href='/public/recommend/recommend' target='blank'>mời bạn bè tham gia</a> để có được nhiều vòng quay nhé!";
                    new notificationMessage(
                        welcomeMessage,
                        "Vòng quay bạn bè",
                        10
                    );
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
                if (_this.numRound <= 0) {
                    messageRound =
                        "Hiện tại, bạn không có lượt quay nào. Hãy <a href='/public/recommend/recommend' target='_blank'>mời bạn bè tham gia</a> để có lượt quay nhé!.";
                } else {
                    _this.totalPoint = data.totalPoint ? data.totalPoint : 0;
                    messageRound =
                        "Hiện tại, bạn có " + _this.numRound + " lượt quay.";
                }
                messageRound +=
                    "<br>Tổng số điểm bạn nhận được vòng quay bạn bè là " +
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
            url: "/public/api-campaign/friend-wheel2017/ajax-get-lucky-number",
            dataType: "json"
        })
            .done(function(data) {
                error = data.error;
                value = data.data;
                if (error == 0 && callback) {
                    callback(data);
                } else {
                    new notificationMessage(value);
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

                    // var usernameLengthLimit = 10;
                    // if (row.UserName.length > usernameLengthLimit){
                    //     row.UserName = row.UserName.substring(0, usernameLengthLimit - 1) + "..";
                    // }

                    // var emailLengthLimit = 25;
                    // if (row.email.length > emailLengthLimit){
                    //     row.email = row.email.substring(0, emailLengthLimit - 1) + "..";
                    // }

                    dataArray.push([i + 1, row.UserName, row.email]);
                }

                if (typeof _this.friendListObject == "undefined") {
                    _this.friendListObject = new friendList(dataArray);
                } else {
                    _this.friendListObject.drawData(dataArray);
                }
                // console.log("_this.friendListObject: ", _this.friendListObject);
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
