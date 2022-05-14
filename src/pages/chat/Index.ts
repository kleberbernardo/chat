type messageType = {
  id: number;
  name: string;
  message: string;
  img_url: string;
};

// #### Falta
// Tela para entrar com git hub e mostrar fotinha personalizada???????

class Chat {
  static messages: messageType[] = [];

  static inverse: boolean = true;

  static lastIds: boolean[] = [];

  static uniqueId: number = Math.floor((1 + Math.random()) * 0x10000);

  static profile: {
    img_url: string;
    userName: string;
  };

  static socket: any;

  static readonly dateNow: string = new Date()
    .toLocaleDateString('pt-br', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    })
    .toUpperCase();

  constructor() {
    window.onload = () => {
      Chat.initChat();
      Chat.sendEnterMessage();
      Chat.socketClientInit();
    };
  }

  static socketClientInit() {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    this.socket = io(`ws://localhost:5500`, {
      transports: ['websocket'],
      auth: {
        token: 'abc',
      },
    });
    this.socket.on('connect_finish', () => {});
    this.socket.on('connect_error', (err: any) => console.log(err));
    this.socket.on('addMessage', (data: messageType) => this.addMessage(data));
    this.socket.emit('setNewMemberOnline', this.uniqueId);
    this.socket.on(
      'onlineMembers',
      (
        membersId: {
          socketId: string;
          memberId: number;
        }[],
      ) => Chat.checkLimiteMembers(membersId),
    );
  }

  static initChat() {
    const titleDay: HTMLElement | null = document.querySelector(
      '.content__title-day',
    );
    titleDay && (titleDay.textContent = Chat.dateNow);

    Chat.checkUSerParam();
  }

  static async enterTheChat() {
    const githubUser: HTMLInputElement | null =
      document.querySelector('#github_user');

    if (githubUser?.value && githubUser?.value.trim() !== '') {
      window.location.assign(`/?user=${githubUser.value}`);
    }
  }

  static async loadChat(user: string | null) {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();

      this.profile = {
        img_url: data.avatar_url,
        userName: data.name,
      };

      const imgAvatar: HTMLImageElement | null =
        document.querySelector('#img_url_avatar');

      imgAvatar && (imgAvatar.src = data.avatar_url);

      const userName: HTMLElement | null = document.querySelector('#user_name');

      userName && (userName.textContent = data.name);

      if (window.location.pathname === '/login') {
        window.location.assign('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Ocorreu um errro. Verifique o usuário ou tente mais tarde!');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
      console.log('Error API: ', error);
    }
  }

  static checkUSerParam() {
    if (window.location.pathname !== '/login') {
      const urlParams: URLSearchParams = new URLSearchParams(
        window.location.search,
      );
      const user: string | null = urlParams.get('user');

      !user && !this.profile?.img_url
        ? window.location.assign('/login')
        : Chat.loadChat(user);
    }
  }

  static checkLimiteMembers(
    membersIds: {
      socketId: string;
      memberId: number;
    }[],
  ) {
    const blockUser: HTMLElement | null = document.querySelector('.block-user');

    const canAccess = membersIds.filter(
      (data) => data.memberId === this.uniqueId ?? data,
    );

    if (membersIds.length === 2 && canAccess.length === 0) {
      blockUser?.classList.add('show-block');
      blockUser?.classList.remove('hidden-block');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    } else {
      blockUser?.classList.add('hidden-block');
      blockUser?.classList.remove('show-block');
    }
  }

  static sendMessage() {
    const messageInput: HTMLInputElement | null =
      document.querySelector('#message');

    const data: messageType = {
      id: this.uniqueId,
      name: this.profile.userName,
      message: messageInput?.value || '',
      img_url: this.profile.img_url,
    };

    messageInput && (messageInput.value = '');

    this.socket.emit('sendMessage', data);
  }

  static sendEnterMessage() {
    document.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'enter') {
        Chat.sendMessage();
      }
    });
  }

  static addMessage = (data: messageType) => {
    data.message.trim() && this.setMessageInElements(data);
  };

  static checkMessageAuthor(id: number) {
    const isId: boolean = Object.keys(this.lastIds).includes(
      (id as unknown as string).toString(),
    );

    if (!isId) {
      this.inverse = this.uniqueId !== id;
      this.lastIds[id] = this.inverse;
    }
  }

  static setMessageInElements = (data: messageType) => {
    Chat.checkMessageAuthor(data.id);

    const html = `<div class="${
      this.lastIds[data.id] ? 'flex-row-reverse' : ''
    } content__messages__item">
        <div class="content__messages__item__img">
        <img
            class="content__messages__item__img_"
            src="${data.img_url}"
            alt="Avatar" />
        </div>
        <div class="content__messages__item__text--color-${
          this.lastIds[data.id] ? 'pink' : 'purple'
        }">
        ${data.message}
        </div>
    </div>`;

    const div: HTMLElement | null =
      document.querySelector('.content__messages');

    div && (div.innerHTML += html);

    div?.scrollTo(0, div.scrollHeight);
  };
}

new Chat();
