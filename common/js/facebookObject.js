function facebookObject(dataUser = null) {
    var _this = this;
    _this.user = dataUser;
    console.log(_this.user);
}

facebookObject.prototype.sharePoint = function(dataUser) {
    var _this = this;
    var username = _this.user["UserName"];
    var point = _this.user["recentyAdded"];
    var descriptionSharing =
        username +
        " vừa mới nhận được " +
        point +
        " điểm từ Vòng Quay May Mắn - Xuân Kỷ Hợi. Click vào đây để tham gia cùng " +
        username +
        " nhé!";
    var hashTag = "#Luckywheel2019";

    // FB.ui(
    //     {
    //         method: "feed",
    //         link: "https://vinaresearch.net/public/vong-quay-tet-2019",
    //         properties: { description: descriptionSharing }
    //     },
    //     function(response) {
    //         console.log(response);
    //         var messageNotifi = "Đã chia sẻ thành công bạn nhé!";
    //         new notificationMessage(messageNotifi, "Facebook");
    //     }
    // );

    // FB.ui(
    //     {
    //         method: "share_open_graph",
    //         action_type: "og.shares",
    //         // link: "https://vinaresearch.net/public/vong-quay-tet-2019",
    //         caption: descriptionSharing,
    //         // quote: descriptionSharing,
    //         hashtag: hashTag,
    //         action_properties: JSON.stringify({
    //             object: {
    //                 "og:url": "https://vinaresearch.net",
    //                 "og:title": "Vòng Quay May Mắn - Xuân Kỷ Hợi",
    //                 "og:description": descriptionSharing,
    //                 "og:image":
    //                     "https://vinaresearch.net/application/templates/default/default/images/og.png"
    //             }
    //         })
    //     },
    //     function(response) {
    //         if (response && !response.error_message) {
    //             var messageNotifi = "Đã chia sẻ thành công bạn nhé!";
    //             new notificationMessage(messageNotifi, "Facebook");
    //         } else {
    //             // var messageNotifi = "!";
    //             // new notificationMessage(messageNotifi, "Facebook");
    //         }
    //     }
    // );

    FB.ui(
        {
            method: "share",
            href: "https://vinaresearch.net/public/vong-quay-tet-2019",
            quote: descriptionSharing,
            hashtag: hashTag,
            action_properties: JSON.stringify({
                object: {
                    "og:url":
                        "https://vinaresearch.net/public/vong-quay-tet-2019",
                    "og:title": "Vòng Quay May Mắn - Xuân Kỷ Hợi",
                    "og:description": descriptionSharing,
                    "og:image":
                        "https://vinaresearch.net/public/vong-quay-tet-2019/common/img/facebook-post.png"
                }
            })
        },
        // callback
        function(response) {
            if (response && !response.error_message) {
                var messageNotifi = "Đã chia sẻ thành công bạn nhé!";
                new notificationMessage(messageNotifi, "Facebook");
            } else {
                // var messageNotifi = "!";
                // new notificationMessage(messageNotifi, "Facebook");
            }
        }
    );

    return false;
};
