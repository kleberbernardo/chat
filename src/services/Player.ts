export class Player {
  static ids: number[] = [];

  static setAppOnline(appId: number): boolean {
    if (!Player.ids.includes(appId)) {
      this.ids.push(appId);
    }
    console.log(appId, ' - Inserido');
    return true;
  }
}
