function resultTableBroad(listResult = null) {
    var _this = this;
    _this.targetObject = document.getElementById("resultArea");
    _this.appendObject = _this.targetObject.getElementsByClassName(
        "contentObject"
    )[0];
    _this.currentTable = _this.targetObject.getElementsByTagName("table")[0];

    table = _this.drawData(listResult);

    if (!_this.currentTable) {
        _this.appendObject.appendChild(table);
    } else {
        $(_this.currentTable).replaceWith(table);
    }
}

resultTableBroad.prototype.drawData = function(listResult) {
    var listTitle = [
        "STT",
        "Tài khoản",
        "Tổng điểm",
        "Thời gian quay mới nhất"
    ];
    if (!listResult) listResult = [listTitle];

    var result = document.createElement("table");
    result.id = "resultTable";

    var trTitle = document.createElement("tr");
    for (i = 0; i < listTitle.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = listTitle[i];

        trTitle.appendChild(th);
    }

    result.appendChild(trTitle);

    for (i = 0; i < listResult.length; i++) {
        var trData = document.createElement("tr");
        // for(j=0; j<listResult[i].length; j++){
        for (j = 0; j < 4; j++) {
            var tdData = document.createElement("td");
            tdData.innerHTML = listResult[i][j];
            trData.appendChild(tdData);
        }
        if (listResult[i][4]) {
            trData.className += "currentUser";
        }
        result.appendChild(trData);
    }
    return result;
};
