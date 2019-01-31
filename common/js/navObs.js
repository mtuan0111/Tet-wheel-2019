function mainNavigate(dataUser = null) {
  var _this = this;
  _this.parent = document.getElementsByTagName("footer")[0];
  _this.currentNav = _this.parent.getElementsByClassName("pageNav")[0];
  _this.userData = dataUser;
  _this.topNav = _this.create(dataUser);
}

mainNavigate.prototype.generateNavArray = function(dataUser) {
  var _this = this;
  if (!dataUser) {
    var arrayData = [
      { href: "#thele", innerHTML: "Thể lệ" },
      { href: "#vongquay", innerHTML: "Vòng quay" },
      { href: "#ketqua", innerHTML: "Kết quả" },
      { href: "#dangnhap", innerHTML: "Đăng nhập" }
    ];
  } else {
    _this.Username = dataUser["UserName"];
    _this.Point = parseInt(dataUser["Point"]);
    var arrayData = [
      { href: "#thele", innerHTML: "Thể lệ" },
      { href: "#vongquay", innerHTML: "Vòng quay" },

      {
        href: "#thongtin",
        "data-username": _this.Username,
        "data-userpoint": _this.Point
      },
      { href: "#ketqua", innerHTML: "Kết quả" },
      { href: "#dangxuat", innerHTML: "Đăng xuất" }
    ];
  }

  _this.arrayData = arrayData;
  return arrayData;
};

mainNavigate.prototype.create = function(dataUser) {
  var _this = this;

  _this.userData = dataUser;
  var topNav = document.createElement("nav");
  topNav.className += " pageNav";

  var arrayData = _this.generateNavArray(dataUser);
  for (var i = 0; i < arrayData.length; i++) {
    var ob = arrayData[i];
    var aNav = document.createElement("a");
    topNav.appendChild(aNav);
    for (var key in ob) {
      if (ob.hasOwnProperty(key)) {
        switch (key) {
          case "innerHTML":
            aNav.innerHTML = ob[key];
            break;
          default:
            aNav.setAttribute(key, ob[key]);
            break;
        }
      }
    }
  }

  if (_this.currentNav) {
    _this.currentNav.innerHTML = topNav.innerHTML;
    _this.topNav = _this.currentNav;
  }

  return topNav;
};

mainNavigate.prototype.addPoint = function(point) {
  var _this = this;
  _this.Point += point;
  var pointElement = document.querySelector("[href='#thongtin']");
  if (pointElement) {
    pointElement.setAttribute("data-userpoint", _this.Point);
  }
};
