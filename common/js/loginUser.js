function loginUser() {
    this.loginForm = null;
}

loginUser.prototype.createForm = function() {
    var _this = this;

    var form = document.createElement("form");
    form.setAttribute("class", "login-form loginContext");

    var username = document.createElement("input");
    username.setAttribute("id", "username");
    username.setAttribute("type", "text");
    username.setAttribute("name", "lg_Username");
    username.setAttribute("placeholder", "Tài khoản");
    username.setAttribute("class", "type");

    var password = document.createElement("input");
    password.setAttribute("id", "password");
    password.setAttribute("type", "password");
    password.setAttribute("name", "lg_Password");
    password.setAttribute("placeholder", "Mật khẩu");
    password.setAttribute("class", "type");

    var rememberMe = document.createElement("input");
    rememberMe.setAttribute("id", "rememberMe");
    rememberMe.setAttribute("type", "checkbox");

    var rememberLbl = document.createElement("label");
    rememberLbl.setAttribute("for", "lg_rememberMe");
    $(rememberLbl).append("Nhớ tài khoản");

    var errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "error-message");
    $(errorMessage).append("Lỗi đây");

    var submitBtn = document.createElement("input");
    submitBtn.setAttribute("id", "submit");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Đăng nhập");

    var skipBtn = document.createElement("a");
    skipBtn.setAttribute("class", "skipLogin");
    skipBtn.setAttribute("href", "javascript:void(0)");
    $(skipBtn).append("Trở lại");

    $(form).append(username);
    $(form).append(password);
    $(form).append(rememberLbl);
    $(form).append(rememberMe);
    $(form).append(errorMessage);
    $(form).append(submitBtn);
    $(form).append(skipBtn);
    _this.loginForm = form;

    $(document).on("submit", form, function(e) {
        var username = $("input[name='lg_Username']").val();
        var password = $("input[name='lg_Password']").val();
        var redirect = $("input[name='popup_redirect']").val();
        var remember = $("input[name='lg_rememberMe']").val();
        $.ajax({
            type: "POST",
            url: "/public/index/check-login-ajax",
            data: {
                lg_Username: username,
                lg_Password: password,
                rememberMe: remember
            },
            success: function(data) {
                if (data == "1") {
                    location.reload();
                    // window.location.href = document.referrer;
                } else {
                    $(".error-message")
                        .html(data)
                        .slideDown();
                }
            },
            error: function(error) {
                var data = "Kết nối không thành công.";
                $(".error-message")
                    .html(data)
                    .slideDown();
            }
        });
        e.preventDefault();
    });

    $(document).on("click", ".skipLogin", function(e) {
        _this.removeForm();
        e.preventDefault();
    });

    $(document).on("click", "body", function(e) {
        if ($(form).parents(".loginCircle")[0]) {
            _this.removeForm();
        }
        e.preventDefault();
    });

    $(document).on("click", ".loginCircle", function(e) {
        e.stopPropagation();
    });

    return form;
};

loginUser.prototype.removeForm = function() {
    var _this = this;
    $(_this.loginForm)
        .parents(".loginCircle")
        .fadeOut(300, function() {
            // $(this).remove();
        });
};
