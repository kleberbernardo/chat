type messageType = {
  id: number;
  name: string;
  message: string;
  img_url: string;
  order: number;
};

class Chat {
  static messages: messageType[] = [];

  static inverse: boolean = false;

  static lastId: number;

  static addMessage = () => {
    const messageInput: HTMLInputElement | null =
      document.querySelector('#message');

    const id = new Date().getMinutes();

    const data = {
      id,
      name: 'Kleber',
      message: messageInput?.value || '',
      img_url: 'http://127.0.0.1:5500/public/assets/img/avataaars.png',
      order: 0,
    };

    messageInput && (messageInput.value = '');

    data.message && this.setMessageInElements(data);
  };

  static setMessageInElements = (data: messageType) => {
    if (!this.lastId) {
      this.lastId = data.id;
    }

    this.inverse = this.lastId !== data.id;

    const html = `<div class="${
      this.inverse ? 'flex-row-reverse' : ''
    } content__messages__item">
        <div class="content__messages__item__img">
        <img
            class="w-10"
            src="${data.img_url}"
            alt="Avatar" />
        </div>
        <div class="content__messages__item__text--color-${
          this.inverse ? 'pink' : 'purple'
        }">
        ${data.message}
        </div>
    </div>`;

    const div: HTMLElement | null =
      document.querySelector('.content__messages');

    if (!this.inverse) {
      this.lastId = data.id;
    }

    div && (div.innerHTML += html);
  };
}

new Chat();
