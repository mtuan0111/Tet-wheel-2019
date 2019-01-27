function friendList(dataArray = null) {
  var _this = this;
  _this.parrentTarget = document.getElementById("playPage");
  _this.createBroad(function() {
    _this.drawData(dataArray);
    _this.friendListBroad.style.height = "0";
    _this.parrentTarget.appendChild(_this.friendListBroad);
    setTimeout(function() {
      _this.friendListBroad.style.height = "";
    }, 10);
  });
}

friendList.prototype.createBroad = function(callback = null) {
  var _this = this;

  _this.friendListBroad = document.createElement("div");
  _this.friendListBroad.className += " broad";

  _this.tupeBottom = document.createElement("tupeBottom");
  _this.tupeBottom.className += " tupeBottom";

  _this.tupeTop = document.createElement("tupeTop");
  _this.tupeTop.className += " tupeTop";

  _this.friendListBroad.appendChild(_this.tupeBottom);
  _this.friendListBroad.appendChild(_this.tupeTop);

  _this.broadContent = document.createElement("div");
  _this.broadContent.className += "broadContent";
  _this.broadContent.id = "friendListBroad";

  _this.title = document.createElement("p");
  _this.title.className += "title";
  _this.title.innerHTML = "Danh sách";

  _this.listTable = document.createElement("table");

  _this.broadContent.appendChild(_this.title);
  _this.broadContent.appendChild(_this.listTable);
  _this.broadContent.appendChild(_this.createSubNav());

  _this.friendListBroad.appendChild(_this.broadContent);

  if (callback) {
    callback();
  }
  return _this.loginForm;
};

friendList.prototype.createSubNav = function() {
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

  refreshLink = document.createElement("a");
  refreshLink.href = "#danhsach";
  refreshLink.innerHTML = "Cập nhật";

  // nav.appendChild(introLink);
  // nav.appendChild(playLink);
  // nav.appendChild(resultLink);
  nav.appendChild(refreshLink);

  return nav;
};

friendList.prototype.drawData = function(listResult) {
  var _this = this;

  var listTitle = ["STT", "Tài khoản", "Email"];
  if (!listResult) listResult = [listTitle];

  var result = document.createElement("table");

  var trTitle = document.createElement("tr");
  for (i = 0; i < listTitle.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = listTitle[i];

    trTitle.appendChild(th);
  }

  result.appendChild(trTitle);

  if (!listResult.length) {
    var trData = document.createElement("tr");
    var tdData = document.createElement("td");
    tdData.setAttribute("colspan", listTitle.length);
    tdData.innerHTML = "Chưa có người bạn nào đăng ký thành công.";
    trData.appendChild(tdData);
    result.appendChild(trData);
  } else {
    for (i = 0; i < listResult.length; i++) {
      var trData = document.createElement("tr");
      for (j = 0; j < listResult[i].length; j++) {
        var tdData = document.createElement("td");
        tdData.innerHTML = listResult[i][j];
        trData.appendChild(tdData);
      }
      result.appendChild(trData);
    }
  }
  var trData = document.createElement("tr");
  trData.className += " noteRow";
  var tdData = document.createElement("td");
  tdData.setAttribute("colspan", listTitle.length);
  tdData.innerHTML =
    "Bãn hãy nhấn vào <a href='/public/recommend/recommend' target='blank'>đây</a> để mời thêm bạn bè tham gia nhé!";
  trData.appendChild(tdData);
  result.appendChild(trData);

  _this.listTable = result;
  $(_this.friendListBroad.getElementsByTagName("table")[0]).replaceWith(result);
  return result;
};
