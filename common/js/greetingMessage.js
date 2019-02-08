function greetingMessage(text = null, callback) {
    _this = this;
    _this.parrent = document.querySelector("#loadingProcessing .content");
    _this.currentMessage = _this.parrent.getElementsByClassName(
        "greetingMessage"
    )[0];

    _this.readTextFile("common/greetings.txt", function() {
        var countMessage = _this.messages.length;
        var text = "";
        do {
            var pickMessage =
                Math.round(Math.random() * (countMessage - 1)) + 1;
            text = _this.messages[pickMessage];
            text = text.trim();
        } while (_this.checkMessageAvaliable(text));

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
        currentText = checkCurrentMessage.querySelector(
            ".greetingMessage-message"
        ).innerHTML;
    }
    return currentText == text;
};

function pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
greetingMessage.prototype.readTextFile = function(file, callback) {
    // var rawFile = new XMLHttpRequest();
    // rawFile.open("GET", file, false);
    // rawFile.onreadystatechange = function() {
    //     if (rawFile.readyState === 4) {
    //         if (rawFile.status === 200 || rawFile.status == 0) {
    //             var allText = rawFile.responseText;
    //             _this.messages = allText.split("\n");
    //             callback();
    //         }
    //     }
    // };
    // rawFile.send(null);
    _this.messages = [
        "Chúc mừng năm Kỷ Hợi 2019, chúc mừng nhiều may mắn mới, chúc cho một năm thành công, thắng lợi.",
        "Chúc mọi người năm mới An khang thịnh vượng, tài lộc đầy nhà, con cháu sum vầy, một năm bình an và sung túc.",
        "Chúc bạn một năm mới hạnh phúc với hy vọng bạn sẽ có nhiều phước lành trong năm tới.",
        "Năm cũ đi qua, năm mới đã đến, chúc bạn có một năm tràn ngập bình an, hạnh phúc, may mắn và vui vẻ. Happy New Year!",
        "Đêm sẽ tối, ngày sẽ sáng, chúc bạn có cuộc sống luôn tươi sáng, gặp nhiều may mắn và thành công. Chúc mừng năm mới.",
        "Hãy để năm cũ kết thúc và năm mới bắt đầu với những khát vọng, những mục tiêu mới. Chúc mừng năm mới.",
        "Hy vọng năm mới của bạn có nhiều hạnh phúc mới, mục tiêu, thành tựu mới và có nhiều cảm hứng mới về cuộc sống. Chúc bạn một năm tràn ngập hạnh phúc.",
        "Chúc bạn mỗi ngày của năm mới đều tràn đầy thành công, hạnh phúc và thịnh vượng. Happy New Year!.",
        "Chúc bạn một năm mới tràn ngập niềm vui, có một năm mới hạnh phúc.",
        "Năm mới mang đến hy vọng, quyết tâm, tinh thần và những mong muốn. Chúc bạn có một năm đầy hứa hẹn và trọn vẹn.",
        "Có thể những niềm vui của năm mới kéo dài mãi mãi trong cuộc sống của bạn. Có thể bạn sẽ tìm thấy được ánh sáng dẫn bạn đến thành công, cái đích mà bạn mong muốn. Chúc mừng năm mới.",
        "Hãy cùng vẫy tay tạm biệt năm cũ, đón nhận năm mới với nhiều ước mơ, hoài bão và cả hy vọng. Chúc bạn năm mới tràn ngập niềm vui và hạnh phúc.",
        "Tôi hy vọng cuộc sống của bạn sẽ đầy bất ngờ, niềm vui trong năm mới. Bạn sẽ được ban phước với mọi thứ mà bạn muốn trong cuộc sống.",
        "Hy vọng mới, kế hoạch mới, hiệu quả mới, cảm nhận mới, cam kết mới. Chào mừng năm 2019 với một thái độ tươi mới. Happy New Year!",
        "Chúc mừng năm mới. Chúc cho bạn một năm mọi mục tiêu, mong muốn đều được thực hiện.",
        "Chúc mừng năm mới. Chúc bạn một năm suôn sẻ, hạnh phúc, không ưu phiền.",
        "Tết đến, xuân về, an khang thịnh vượng, phát tài phát lộc, sức khỏe dồi dào, mọi điều như ý.",
        "My fondness for you grew even stronger this year. I love the way you confide in me and express your feelings so easily. My only wish for you in the new year is, just stay the same, dear. Happy New Year! [Lời dịch]: Tình yêu em dành cho anh cứ lớn dần và ngày càng mạnh mẽ. Em yêu cái cách anh tin tưởng ở em và bày tỏ cảm xúc của chính mình. Ước muốn duy nhất của em trong năm mới này là luôn có anh ở bên, anh yêu. Chúc anh năm mới hạnh phúc!",
        "Hoping to engage less in the virtual world and more in the real world this year. Here's to new beginnings... Happy New Year! [Lời dịch]: Mong rằng năm nay bạn sẽ sống ảo ít đi và sống thật nhiều hơn. Một khởi đầu mới đã bắt đầu... Chúc mừng năm mới!",
        "Minutes turn into hours but our conversations never end. Here's to another 365 days on non-stop chatter! Wish you a very happy new year, my friend. [Lời dịch]: Vài phút biến thành vài giờ mà cuộc trò chuyện của chúng ta chưa bao giờ chấm dứt. Lại thêm 365 ngày nữa để tám chuyện bất tận. Chúc cậu năm mới vui vẻ, bạn tốt của mình.",
        "May this new year be a joyful ride for you and your family. Here's wishing you best year ahead. Happy New Year! [Lời dịch]: Mong một năm mới tràn đầy niềm vui, tiếng cười sẽ đến với anh và gia đình. Chúc anh năm mới an khang, thịnh vượng và gặp nhiều may mắn!",
        'We learn from each other and blossom together. It is this "friendship plant" I want to nurture daily. Happy New Year! [Lời dịch]: Chúng ta học hỏi lẫn nhau và cùng nhau trổ bông. Đây là "cây tình bạn" mà tớ muốn chăm sóc mỗi ngày. Chúc cậu năm mới an lành!',
        "May the new year days be as bright as the sunshine and as calm as the moonlight. Have a wonderful year ahead.[Lời dịch]: Chúc mọi người năm mới rạng rỡ như ánh mặt trời và yên bình như ánh trăng. Chúc năm mới hạnh phúc!",
        "Wishing you healthy, peaceful and joyful 2019. [Lời dịch]: Chúc mọi người năm mới 2019 sức khỏe, hạnh phúc và an lành!",
        "Just as a new bloom spreads fragrance and freshness around May the new year add a new beauty, freshness into your life. Happy New Year 2019. [Lời dịch]: Giống như một bông hoa mới mang đến hướng thơm và sự tươi mới cho đời, mong rằng năm mới sẽ mang đến vẻ đẹp và sức sống mới cho cuộc sống của cậu. Chúc mừng năm mới 2019!",
        "May this year bring new happiness, goals, achievements and a lot of new inspiration for your life. Wishing you a year fully loaded with happiness. [Lời dịch]: Mong rằng năm mới sẽ mang đến hạnh phúc mới, mục tiêu mới, thành công mới và nguồn động lực mới cho bạn. Chúc năm mới tràn ngập niềm vui!",
        "The New Year is here! Look ahead, embark on the road to success. May you have a great journey to your destination! Happy 2019. [Lời dịch]: Năm mới đến rồi! Tìm kiếm và theo đuổi con đường đến với thành công thôi nào! Chúc cậu có một hành trình chinh phục mục tiêu đầy ý nghĩa. Happy 2019!",
        "Life changes, but my New Year wish for you remains the same- I wish you happiness, good health and well-being from the bottom of my heart! [Lời dịch]: Cuộc sống luôn đổi thay nhưng lời chúc Năm mới của con vẫn không thay đổi - Con chúc bố mẹ năm mới nhiều sức khỏe, niềm vui và an khang thịnh vượng!",
        "As we step into another year I’d like to thank you for lifting me up every time when I am down and encouraging me to move forward. Have a beautiful year! [Lời dịch]: Lại một năm mới đang đến... Con muốn cảm ơn bố đã luôn an ủi con khi con buồn và thúc giục con tiến về phía trước. Con chúc bố năm mới mạnh khỏe, gặp nhiều may mắn!",
        "//LỜI CHÚC TẾT HÀI HƯỚC",
        "Chúc bạn năm mới sức khỏe dồi dào, tiền vô như nước, tiêu tiền thoải mái. Happy New Year.",
        "Chúc mừng năm mới. Chúc bạn khỏe như trâu, tiền tài tấn tới, một năm phát đạt và  thành công.",
        "Happy New Year. Chúc một năm hạnh phúc, sớm thả thỉnh được anh chàng như mày mong ước.",
        "Chúc bà con gần xa, từ người thân đến người xa lạ, từ bạn bè tới đồng nghiệp một năm mới hạnh phúc, tràn ngập niềm vui.",
        "Năm mới đã đến, chúc bạn đáng mến, gặp nhiều may mắn, tài lộc đầy nhà, sự nghiệp thành công.",
        "Lại một mùa Tết nữa lại về và năm nay là Tết con Lợn, Tết Kỷ hợi 2019 và năm nay cũng biểu trưng cho năm của may mắn và thành công nhờ đặc tính chăm chỉ và thông minh của loài Lợn. Chắc chắn bạn sẽ thấy rất vui khi ai đó gửi lời chúc tết 2019, lời chúc tết Kỷ Hợi ấm áp vào đêm giao thừa hay trong những ngày tết. Và bạn cũng đừng quên tìm và ghi nhớ cho mình những lời chúc năm mới 2019 bằng cả Tiếng Anh để gửi lời chúc tết 2019 ấn tượng nhất tới bạn bè nước ngoài nhé. Cũng không quên nếu bạn có tài thơ văn, việc áp dụng các câu chúc tết hay khi chúc nhau cũng rất tuyệt vời.",
        "Việt Nam là đất nước có rất nhiều những dịp lễ, nếu bạn chưa biết hết thời gian cũng như cũng như các dịp lễ và các ngày lễ lớn trong năm ở Việt Nam, các bạn có tìm đọc và tham khảo bài viết về các ngày lễ lớn trong năm tại Việt Nam để biết thêm thông tin.",
        "Hàng năm, vào ngày 23 tháng chạp (tức 23 tết âm lịch), ngày mà mọi gia đình đều bày lễ để cúng ông công, ông táo về trời. Vào ngày này, ngoài mâm cỗ thịnh soạn thì bài cúng ông táo cũng được nhiều người chú trọng, nếu bạn chưa có bài cúng ông táo nào thì hãy chuẩn bị từ bây giờ nhé.",
        "Chúc mừng năm Kỷ Hợi – Chào mừng may mắn mới – Một năm ắt thắng lợi.",
        "Con chúc gia đình một năm mới Thịnh vượng an khang - Giữ chặt lộc tài - Hưởng trọn bình an - Cùng nhau sung túc.",
        "Mọi thứ lại bắt đầu khi năm mới đang đến. Chúc bạn năm mới đầy hạnh phúc và những tháng đầy triển vọng và hạnh phúc nhất.",
        "Mọi việc lại bắt đầu tốt đẹp. Chúc bạn thành công trong năm mới. Những lời chúc chân thành của tôi đến với cuộc sống huy hoàng của bạn.",
        "Chúc mừng năm mới 2019, chúc mọi điều bình an, tốt đẹp tới bạn và gia đình!",
        "Năm 2019 đã tới! Chúc bạn 1 năm may mắn, phát đạt và hạnh phúc. Chúc mừng năm mới!",
        "Chúc mọi điều tốt đẹp trong năm mới nhé. Happy new year!",
        "Năm mới chúc nhau sức khỏe nhiều, công việc hanh thông, tiền bạc rủng rỉnh. Happy New Year 2019.",
        "1 năm mới, 1 tuổi mới, nhiều bạn mới, nhiều hiểu biết mới và 1 lời chúc Mãi mãi hạnh phúc bên gia đình và những người thân yêu nhất. ",
        "Chúc bạn khỏe và hạnh phúc trong năm mới.",
        "Chúc bạn luôn vui vẻ, bình an và hạnh phúc trong năm mới!",
        "Chúc mừng năm mới! Đa lộc, Đa tài, Đa phú quý! Đắc thời, đắc thắng, đắc nhân tâm! ",
        "Mọi thứ lại bắt đầu khi năm mới đang đến. Chúc bạn năm mới đầy hạnh phúc và những tháng đầy triển vọng và hạnh phúc nhất.",
        "Chúc mừng năm mới! Xuân đến gia đình vui xum họp. Tết về con cháu hưởng bình an.",
        "Mong rằng năm mới sẽ mang sự bình yên và phát đạt đến cho bạn.",
        "CHÚC MỪNG NĂM MỚI 2019 .12 tháng phú quý, 365 ngày phát tài, 8760 giờ sung túc, 525600 phút thành công 31536000 giây VẠN SỰ NHƯ Ý.",
        "Chúc mừng năm mơí Kỷ Hợi: Thành công luôn tới, sức khỏe tuyệt vời, may mắn khắp nơi, làm nhiều điều mới.",
        "Chúc năm mới! Công thành danh toại - Trẻ mãi không già - Phúc lộc trường tồn - Tấn tài, tấn lộc ",
        "Cung chúc Tân Xuân: Thuận buồm xuôi gió, an khang thịnh vượng!",
        "Đầu xuân năm mới BÌNH AN,Chúc luôn TUỔI TRẺ chúc AN KHANG.",
        "Mùa xuân xin chúc Khúc ca an bình, Năm mới phát tài, Vạn sự như ý.",
        "Năm hết Tết đến. Đón hên về nhà. Quà cáp bao la. Một nhà không đủ. Vàng bạc đầy tủ. Gia chủ phát tài.",
        "Tết tới tấn tài. Xuân sang đắc lộc. Gia đình hạnh phúc. Vạn sự cát tường",
        "Thần tài rảo bước khắp mọi nhà, Tiền lộc đầy ắp, xuân hạnh phúc, Mọi người xum họp vui năm mới. ",
        "Xuân đến hy vọng. Ấm no mọi nhà. Kính chúc ông bà. Sống lâu trăm tuổi.",
        "Xuân này hơn hẳn mấy xuân qua. Phúc lộc đưa nhau đến mọi nhà. Vài lời cung chúc tân niên mới. Vạn sự an khang vạn sự lành.",
        "Nhân dịp năm mới chúc ông bà sống lâu trăm tuổi, chúc ba mẹ sức khỏe dồi dào, chúc cô chú nhà cửa an khang, chúc anh chị vui vẻ, hạnh phúc",
        "Năm mới 2019 sắp đến. Chúc bạn đáng mến. Sự nghiệp tiến lên. Gặp nhiều điều hên!",
        "//NHỮNG CÂU CHÚC TẾT HAY DÀNH CHO BẠN BÈ, ĐỒNG NGHIỆP",
        "Chúc mọi người năm mới an khang thịnh vượng, tài lộc đầy nhà, con cháu sum vầy, một năm bình an và sung túc.",
        "Năm cũ đi qua, năm mới đã đến, chúc bạn một năm tràn ngập bình an, hạnh phúc, may mắn và vui vẻ. Happy New Year!",
        "Đêm phải tối, ngày phải sáng, còn cuộc sống của bạn phải luôn may mắn và thành công. Chúc mừng năm mới!",
        "Hy vọng năm mới của bạn sẽ tràn ngập hạnh phúc, có thêm mục tiêu, thành tựu mới và luôn đong đầy niềm tin yêu cuộc sống.",
        "Chúc bạn mỗi ngày của năm mới đều tràn đầy thành công, hạnh phúc và thịnh vượng. Happy New Year!",
        "Chúc bạn có một năm đầy hứa hẹn và trọn vẹn.",
        "Chúc bạn một năm suôn sẻ, hạnh phúc, không ưu phiền.",
        "Tết đến, Xuân về, an khang thịnh vượng, phát tài phát lộc, sức khỏe dồi dào, mọi điều như ý.",
        "//NHỮNG CÂU CHÚC TẾT HAY DÀNH CHO GIA ĐÌNH",
        "Chúc ông bà một tô như ý, chúc cô chú một chén an khang, chúc anh chị một đĩa tài lộc. Cung kính mời nhau chén rượu nồng, chúc mừng năm đến tiễn năm xong. Tân niên phúc lộc khơi vừa dạ. Xuân mới tài danh khởi thỏa lòng, vạn chuyện lo toan thay đổi hết, sự gì bế tắc thảy hanh thông. Như anh như chị, bằng bè bạn. Ý nguyện, duyên lành, đẹp ước mong.",
        "Xuân đến hy vọng, ấm no mọi nhà. Kính chúc ông bà, sống lâu trăm tuổi.",
        "Năm mới chúc gia đình ta một nụ cười cho lòng thêm ấm áp, một ánh mắt cho hạnh phúc tràn đầy, một lời nói cho trọn vẹn niềm tin, một chút hờn ghen cho yêu thương tỏa sáng, một trái tim hồng cho tình luôn thủy chung.",
        "Chúc mừng năm mới. Chúc đại gia đình ta công thành danh toại. Trẻ mãi không già, phúc lộc trường tồn. Tấn tài tấn lộc.",
        "Năm mới 2019 Kỷ Hợi đã đến, con chúc bố mẹ sức khỏe dồi dào, vui vẻ, hạnh phúc và sẽ ở bên chúng con để đón nhiều cái tết hơn nữa."
    ];
    callback();
};

greetingMessage.prototype.checkMessageAvaliable = function(text) {
    text = text.trim();
    if (!text) return false;
    if (text == "" || text == null || text == " ") return false;
    if (!text.includes("//")) return false;
    return true;
};

greetingMessage.prototype.translateMessage = function(text) {
    if (text.includes("[Lời dịch]:")) {
        text = text.trim();
        text = text.replace("[Lời dịch]: ", "<p>");
        text += "</p>";
    }
    return text;
};
