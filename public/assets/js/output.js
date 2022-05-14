var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        Chat.checkUSerParam();
    };
    Chat.enterTheChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var githubUser;
            return __generator(this, function (_b) {
                githubUser = document.querySelector('#github_user');
                if ((githubUser === null || githubUser === void 0 ? void 0 : githubUser.value) && (githubUser === null || githubUser === void 0 ? void 0 : githubUser.value.trim()) !== '') {
                    window.location.assign("/?user=".concat(githubUser.value));
                }
                return [2 /*return*/];
            });
        });
    };
    Chat.loadChat = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, imgAvatar, userName, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://api.github.com/users/".concat(user))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        this.profile = {
                            img_url: data.avatar_url,
                            userName: data.name
                        };
                        imgAvatar = document.querySelector('#img_url_avatar');
                        imgAvatar && (imgAvatar.src = data.avatar_url);
                        userName = document.querySelector('#user_name');
                        userName && (userName.textContent = data.name);
                        if (window.location.pathname === '/login') {
                            window.location.assign('/');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        // eslint-disable-next-line no-alert
                        alert('Ocorreu um errro. Verifique o usuário ou tente mais tarde!');
                        if (window.location.pathname !== '/login') {
                            window.location.assign('/login');
                        }
                        console.log('Error API: ', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Chat.checkUSerParam = function () {
        var _b;
        if (window.location.pathname !== '/login') {
            var urlParams = new URLSearchParams(window.location.search);
            var user = urlParams.get('user');
            !user && !((_b = this.profile) === null || _b === void 0 ? void 0 : _b.img_url)
                ? window.location.assign('/login')
                : Chat.loadChat(user);
        }
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
            name: this.profile.userName,
            message: (messageInput === null || messageInput === void 0 ? void 0 : messageInput.value) || '',
            img_url: this.profile.img_url
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
        var html = "<div class=\"".concat(_a.lastIds[data.id] ? 'flex-row-reverse' : '', " content__messages__item\">\n        <div class=\"content__messages__item__img\">\n        <img\n            class=\"content__messages__item__img_\"\n            src=\"").concat(data.img_url, "\"\n            alt=\"Avatar\" />\n        </div>\n        <div class=\"content__messages__item__text--color-").concat(_a.lastIds[data.id] ? 'pink' : 'purple', "\">\n        ").concat(data.message, "\n        </div>\n    </div>");
        var div = document.querySelector('.content__messages');
        div && (div.innerHTML += html);
        div === null || div === void 0 ? void 0 : div.scrollTo(0, div.scrollHeight);
    };
    return Chat;
}());
new Chat();
