function greetingMessage(text = null, callback) {
  _this = this;
  // _this.timeOut = timeOutDestroy;
  _this.parrent = document.querySelector("#loadingProcessing .content");
  _this.currentMessage = _this.parrent.getElementsByClassName(
    "greetingMessage"
  )[0];

  _this.readTextFile("common/greetings.txt", function() {
    // var allMessage = _this.messages.split("\n");
    // console.log("text: ", _this.messages.length);
    var countMessage = _this.messages.length;

    do {
      var pickMessage = Math.round(Math.random() * (countMessage - 1)) + 1;
      var text = _this.messages[pickMessage];
      text = text.trim();
    } while (_this.checkMessageAvaliable(text));

    console.log("pickMessage: ", pickMessage);
    text = _this.translateMessage(text);
    _this.timeOut = text.length / 30;

    _this.createMessage(text);

    if (!_this.currentMessage) {
      _this.parrent.appendChild(_this.message);
    } else {
      $(_this.currentMessage).replaceWith(_this.message);
    }

    callback(_this.timeOut);
    _this.destroy();
  });
}

greetingMessage.prototype.createMessage = function(text = null) {
  _this = this;

  message = document.createElement("p");
  message.className += " greetingMessage";
  message.innerHTML = text;

  message.style.display = "none";

  $(message).fadeIn();
  _this.message = message;

  return message;
};

greetingMessage.prototype.destroy = function() {
  var _this = this;
  timeoutDelay = _this.timeOut * 1000;

  setTimeout(function() {
    $(_this.message).fadeOut(function() {
      this.remove();
    });
  }, timeoutDelay);
};

greetingMessage.prototype.checkCurrentMessage = function(text) {
  _this = this;
  checkCurrentMessage = document.getElementsByClassName("greetingMessage")[0];
  if (checkCurrentMessage) {
    currentText = checkCurrentMessage.querySelector(".greetingMessage-message")
      .innerHTML;
  }
  return currentText == text;
};

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
greetingMessage.prototype.readTextFile = function(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        _this.messages = allText.split("\n");
        callback();
      }
    }
  };
  rawFile.send(null);
};

greetingMessage.prototype.checkMessageAvaliable = function(text) {
  text = text.trim();
  if (!text) return false;
  if (text == "" || text == null) return false;
  if (!text.includes("//")) return false;
  return true;
};

greetingMessage.prototype.translateMessage = function(text) {
  if (text.includes("[Lời dịch]:")) {
    text = text.trim();
    text =
      "Wishing you healthy, peaceful and joyful 2019. [Lời dịch]: Chúc mọi người năm mới 2019 sức khỏe, hạnh phúc và an lành!";
    text = text.replace("[Lời dịch]: ", "<p>");
    text += "</p>";
  }
  return text;
};
