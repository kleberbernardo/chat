// #### Falta
// Tela para entrar com git hub e mostrar fotinha personalizada???????
var Chat = /** @class */ (function () {
    function Chat() {
        window.onload = function () {
            Chat.initChat();
            Chat.sendEnterMessage();
            Chat.socketClientInit();
        };
    }
    Chat.socketClientInit = function () {
        var _this = this;
        // @ts-ignore
        // eslint-disable-next-line no-undef
        this.socket = io("ws://localhost:5500", {
            transports: ['websocket'],
            auth: {
                token: 'abc'
            }
        });
        this.socket.on('connect_finish', function () { });
        this.socket.on('connect_error', function (err) { return console.log(err); });
        this.socket.on('addMessage', function (data) { return _this.addMessage(data); });
        this.socket.emit('setNewMemberOnline', this.uniqueId);
        this.socket.on('onlineMembers', function (membersId) { return Chat.checkLimiteMembers(membersId); });
    };
    Chat.initChat = function () {
        var titleDay = document.querySelector('.content__title-day');
        titleDay && (titleDay.textContent = Chat.dateNow);
    };
    Chat.checkLimiteMembers = function (membersIds) {
        var _this = this;
        var blockUser = document.querySelector('.block-user');
        var canAccess = membersIds.filter(function (data) { var _b; return (_b = data.memberId === _this.uniqueId) !== null && _b !== void 0 ? _b : data; });
        if (membersIds.length === 2 && canAccess.length === 0) {
            blockUser === null || blockUser === void 0 ? void 0 : blockUser.classList.add('show-block');
            blockUser === null || blockUser === void 0 ? void 0 : blockUser.classList.remove('hidden-block');
            if (window.location.pathname !== '/login') {
                window.location.assign('/login');
            }
        }
        else {
            blockUser === null || blockUser === void 0 ? void 0 : blockUser.classList.add('hidden-block');
            blockUser === null || blockUser === void 0 ? void 0 : blockUser.classList.remove('show-block');
        }
    };
    Chat.sendMessage = function () {
        var messageInput = document.querySelector('#message');
        var data = {
            id: this.uniqueId,
            name: 'Kleber',
            message: (messageInput === null || messageInput === void 0 ? void 0 : messageInput.value) || '',
            img_url: 'http://127.0.0.1:5500/public/assets/img/avataaars.png'
        };
        messageInput && (messageInput.value = '');
        this.socket.emit('sendMessage', data);
    };
    Chat.sendEnterMessage = function () {
        document.addEventListener('keypress', function (e) {
            if (e.key.toLowerCase() === 'enter') {
                Chat.sendMessage();
            }
        });
    };
    Chat.checkMessageAuthor = function (id) {
        var isId = Object.keys(this.lastIds).includes(id.toString());
        if (!isId) {
            this.inverse = this.uniqueId !== id;
            this.lastIds[id] = this.inverse;
        }
    };
    var _a;
    _a = Chat;
    Chat.messages = [];
    Chat.inverse = true;
    Chat.lastIds = [];
    Chat.uniqueId = Math.floor((1 + Math.random()) * 0x10000);
    Chat.dateNow = new Date()
        .toLocaleDateString('pt-br', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit'
    })
        .toUpperCase();
    Chat.addMessage = function (data) {
        data.message.trim() && _a.setMessageInElements(data);
    };
    Chat.setMessageInElements = function (data) {
        Chat.checkMessageAuthor(data.id);
        var html = "<div class=\"".concat(_a.lastIds[data.id] ? 'flex-row-reverse' : '', " content__messages__item\">\n        <div class=\"content__messages__item__img\">\n        <img\n            class=\"w-10\"\n            src=\"").concat(data.img_url, "\"\n            alt=\"Avatar\" />\n        </div>\n        <div class=\"content__messages__item__text--color-").concat(_a.lastIds[data.id] ? 'pink' : 'purple', "\">\n        ").concat(data.message, "\n        </div>\n    </div>");
        var div = document.querySelector('.content__messages');
        div && (div.innerHTML += html);
        div === null || div === void 0 ? void 0 : div.scrollTo(0, div.scrollHeight);
    };
    return Chat;
}());
new Chat();
