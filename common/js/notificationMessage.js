function notificationMessage(text, title = "Thông báo", timeOutDestroy = 5) {
  _this = this;
  _this.timeOut = timeOutDestroy;

  title = !title ? "Thông báo" : title;

  _this.parrent = document.getElementById("wheelCenter");
  _this.currentMessage = _this.parrent.getElementsByClassName(
    "notification"
  )[0];

  _this.createMessage(text, title);

  if (!_this.currentMessage) {
    $(_this.parrent).prepend(_this.message);
  } else {
    $(_this.currentMessage).replaceWith(_this.message);
  }

  _this.destroy();
}

notificationMessage.prototype.createMessage = function(text, title) {
  _this = this;

  message = document.createElement("div");
  message.className += " notification";

  messageText = document.createElement("p");
  messageText.className += " message";
  messageText.innerHTML = text;

  messageTitle = document.createElement("h2");
  messageTitle.className += " title";
  messageTitle.innerHTML = title;

  message.appendChild(messageTitle);
  message.appendChild(messageText);

  message.style.display = "none";
  $(message).fadeIn();
  _this.message = message;
  return message;
};

notificationMessage.prototype.includeFunc = function() {
  func = document.createElement("div");
  func.className = "func-block";

  loginBtn = document.createElement("a");
  loginBtn.className = "login-page";
  loginBtn.href = "#login-page";
  loginBtn.innerHTML = "Đăng nhập";

  registerBtn = document.createElement("a");
  registerBtn.className = "register-page";
  registerBtn.href = "#register-page";
  registerBtn.innerHTML = "Đăng ký";

  func.appendChild(loginBtn);
  func.appendChild(registerBtn);

  return func;
};

notificationMessage.prototype.destroy = function() {
  var _this = this;
  timeoutDelay = _this.timeOut * 1000;

  setTimeout(function() {
    var randomImage = Math.round(Math.random() * 9);
    document.getElementsByClassName("campaignIcon")[0].style =
      "-webkit-mask-image: url(common/img/pig-icon-0" +
      randomImage +
      ".png);\
      -webkit-mask-repeat: no-repeat;\
      -webkit-mask-size: 70%;\
      -webkit-mask-position: center;";
    $(_this.message).fadeOut(function() {
      this.remove();
    });
  }, timeoutDelay);
};

notificationMessage.prototype.checkCurrentMessage = function(text, title) {
  _this = this;
  checkCurrentMessage = document.querySelector(
    ".notification-warning.displayMessage:last-child"
  );
  if (checkCurrentMessage) {
    currentTitle = checkCurrentMessage.querySelector(".notification-title")
      .innerHTML;
    currentText = checkCurrentMessage.querySelector(".notification-message")
      .innerHTML;
  }
  return currentTitle == title && currentText == text;
};
