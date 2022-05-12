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
      name: 'Kleber',
      message: messageInput?.value || '',
      img_url: 'http://127.0.0.1:5500/public/assets/img/avataaars.png',
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
            class="w-10"
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
