function loginForm() {
    var _this = this;
    _this.parrentTarget = document
        .getElementById("wheelArea")
        .getElementsByClassName("objectsArea")[0];
    _this.createBroad(function() {
        _this.loginBroad.style.display = "none";
        _this.parrentTarget.appendChild(_this.loginBroad);
        // setTimeout(function() {
        $(_this.loginBroad).fadeIn();
        // }, 10);
    });
}

loginForm.prototype.createBroad = function(callback = null) {
    var _this = this;

    _this.loginBroad = document.createElement("div");
    _this.loginBroad.className += " loginCircle";

    _this.outsideCorner = document.createElement("div");
    _this.outsideCorner.className += " outsideCorner";

    _this.insideCorner = document.createElement("div");
    _this.insideCorner.className += " insideCorner";

    _this.circleGroup = document.createElement("div");
    _this.circleGroup.className += " circleGroup";

    _this.circle = document.createElement("div");
    _this.circle.className += " circle";

    _this.circleGroup.appendChild(_this.circle.cloneNode(true));
    _this.circleGroup.appendChild(_this.circle.cloneNode(true));
    _this.circleGroup.appendChild(_this.circle.cloneNode(true));
    _this.circleGroup.appendChild(_this.circle.cloneNode(true));
    _this.circleGroup.appendChild(_this.circle);

    _this.circle.className += " special";

    _this.insideCorner.appendChild(_this.circleGroup.cloneNode(true));
    _this.circleGroup.className += " bottom";
    _this.insideCorner.appendChild(_this.circleGroup);

    _this.loginBroad.appendChild(_this.outsideCorner);
    _this.loginBroad.appendChild(_this.insideCorner);

    _this.broadContent = document.createElement("div");
    _this.broadContent.className += "broadContent";
    _this.broadContent.id = "loginBroad";

    _this.insideCorner.appendChild(_this.broadContent);

    _this.title = document.createElement("h2");
    _this.title.className += "title";
    _this.title.innerHTML = "Thông tin đăng nhập";

    _this.loginForm = document.createElement("form");
    _this.loginForm.id = "frmLogin";
    _this.loginForm.method = "post";

    _this.username = document.createElement("input");
    _this.username.type = "text";
    _this.username.name = "lg_Username";
    _this.username.placeholder = "Tài khoản";

    _this.password = document.createElement("input");
    _this.password.type = "password";
    _this.password.name = "lg_Password";
    _this.password.placeholder = "Mật khẩu";

    _this.errorMessage = document.createElement("p");
    _this.errorMessage.className += " errorMessage";
    _this.errorMessage.innerHTML = "Lỗi đây";

    _this.submitBtn = document.createElement("input");
    _this.submitBtn.type = "submit";
    _this.submitBtn.value = "Đăng nhập";

    _this.registerBtn = document.createElement("a");
    _this.registerBtn.className = "registerBtn";
    _this.registerBtn.href = "https://vinaresearch.net/";
    _this.registerBtn.target = "_blank";
    _this.registerBtn.innerHTML = "Đăng ký";

    var skipBtn = document.createElement("a");
    skipBtn.href = "javascript:void(0)";
    skipBtn.innerHTML = "Trở lại";
    skipBtn.className += "skipLogin";

    _this.loginForm.appendChild(_this.username);
    _this.loginForm.appendChild(_this.password);
    _this.loginForm.appendChild(_this.errorMessage);
    _this.loginForm.appendChild(_this.submitBtn);

    _this.broadContent.appendChild(_this.title);
    _this.broadContent.appendChild(_this.loginForm);
    _this.broadContent.appendChild(_this.registerBtn);
    // _this.broadContent.appendChild(_this.createSubNav());

    // _this.loginBroad.appendChild(_this.broadContent);
    // _this.loginBroad.appendChild(_this.broadContent);

    _this.loginForm.onsubmit = function(e) {
        User.login();
        e.preventDefault();
    };

    if (callback) {
        callback();
    }

    return _this.loginForm;
};

loginForm.prototype.createSubNav = function() {
    nav = document.createElement("nav");
    nav.className += "pageNav";

    introLink = document.createElement("a");
    introLink.href = "#thele";
    introLink.innerHTML = "Thể lệ";

    playLink = document.createElement("a");
    playLink.href = "#vongquay";
    playLink.innerHTML = "Vòng quay";

    resultLink = document.createElement("a");
    resultLink.href = "#ketqua";
    resultLink.innerHTML = "Kết quả";

    nav.appendChild(introLink);
    nav.appendChild(playLink);
    nav.appendChild(resultLink);

    return nav;
};
