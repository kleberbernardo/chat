var Chat = /** @class */ (function () {
    function Chat() {
    }
    var _a;
    _a = Chat;
    Chat.messages = [];
    Chat.inverse = false;
    Chat.addMessage = function () {
        var messageInput = document.querySelector('#message');
        var id = new Date().getMinutes();
        var data = {
            id: id,
            name: 'Kleber',
            message: (messageInput === null || messageInput === void 0 ? void 0 : messageInput.value) || '',
            img_url: 'http://127.0.0.1:5500/public/assets/img/avataaars.png',
            order: 0
        };
        messageInput && (messageInput.value = '');
        data.message && _a.setMessageInElements(data);
    };
    Chat.setMessageInElements = function (data) {
        if (!_a.lastId) {
            _a.lastId = data.id;
        }
        _a.inverse = _a.lastId !== data.id;
        var html = "<div class=\"".concat(_a.inverse ? 'flex-row-reverse' : '', " content__messages__item\">\n        <div class=\"content__messages__item__img\">\n        <img\n            class=\"w-10\"\n            src=\"").concat(data.img_url, "\"\n            alt=\"Avatar\" />\n        </div>\n        <div class=\"content__messages__item__text--color-").concat(_a.inverse ? 'pink' : 'purple', "\">\n        ").concat(data.message, "\n        </div>\n    </div>");
        var div = document.querySelector('.content__messages');
        if (!_a.inverse) {
            _a.lastId = data.id;
        }
        div && (div.innerHTML += html);
    };
    return Chat;
}());
new Chat();
