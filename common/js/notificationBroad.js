function notificationBroad(obs) {
    var _this = this;
    if (!obs) {
        _this.Obj = $($(".notiInfo")[0]).clone();
    } else _this.Obj = obs;

    _this.title = _this.Obj.find(".notiTitle");
    _this.messageContent = _this.title.next();

    _this.loginUser;
    // console.log(_this.messageContent);
    // _this.slideUp();
}

// notificationBroad.prototype
notificationBroad.prototype.setTitle = function(
    stringTitle = "Khai Xuân Đón Lộc"
) {
    console.log("stringTitle: ", stringTitle);
    this.title[0].innerHTML = stringTitle;
};

notificationBroad.prototype.setContent = function(messageContent) {
    this.messageContent.children().remove();
    this.messageContent.append(messageContent);
};

notificationBroad.prototype.setMessage = function(messageContent) {
    var messageAppend = document.createElement("p");
    messageAppend.append(messageContent);

    this.setContent(messageAppend);
};

notificationBroad.prototype.setTakePoint = function(pointValue) {
    var _this = this;
    _this.setTitle("Vòng quay");

    var messageAppend = document.createElement("p");
    var pointAppend = document.createElement("span");
    pointAppend.setAttribute("class", "pointValue");
    pointAppend.append(pointValue);
    // messageAppend
    var message = "Bạn đã quay được vào ô ";
    messageAppend.append(message);
    messageAppend.append(pointAppend);
    messageAppend.append(document.createTextNode(" điểm"));
    _this.setContent(messageAppend);
};

notificationBroad.prototype.setLoginForm = function() {
    var _this = this;
    _this.slideUp();
    _this.setTitle("Đăng nhập");
    _this.loginUser = new loginUser();
    _this.setContent(_this.loginUser.createForm());
};

notificationBroad.prototype.showLoginForm = function() {
    var _this = this;
    // console.log("go there?", _this.Obj);
    if (
        _this.Obj[0]
            .getAttribute("class")
            .split(" ")
            .indexOf("loginBroad") == -1
    ) {
        _this.Obj[0].className += " loginBroad";
    }
    $(_this.Obj)
        .fadeIn(300)
        .insertBefore("#circle-world");
};

notificationBroad.prototype.slideUp = function() {
    var _this = this;
    _this.messageContent.children().slideUp();
};
