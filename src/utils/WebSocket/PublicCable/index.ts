import WebSocket from "../../WebSocket";
import { WebSocketTypes } from "../../../types";

class PublicCable extends WebSocket {
  public setup(): Promise<void> {
    return new Promise((resolve) => {
      this.cable = this.subscriptions.create("PostChannel", {
        connected: () => {
          resolve();
        },
        received: (messages: WebSocketTypes.Messages) => {
          this.handleMessage(messages);
        },
        disconnected: () => {
          this.notifyOffline();
        },
      });
    });
  }

  public notifyOnline() {
    this.cable?.perform("online", {});
  }

  private handleMessage(messages: WebSocketTypes.Messages) {
    if (messages.online) {
      this.handleOnlineMessage(messages.online);
    } else if (messages.offline) {
      this.handleOfflineMessage(messages.offline);
    }
  }

  private handleOnlineMessage({
    user_guid: userGuid,
  }: WebSocketTypes.MessageUserGuid) {
    // 自分の通知は無視
    if (this.currentUserId === userGuid) return;

    console.log(`${userGuid} がオンライン`);

    this.rtc?.connect(userGuid);
  }

  private handleOfflineMessage({
    user_guid: userGuid,
  }: WebSocketTypes.MessageUserGuid) {
    // 自分の通知は無視
    if (this.currentUserId === userGuid) return;

    console.log(`${userGuid} がオフライン`);

    this.rtc?.disconnect(userGuid);
  }
}

export default PublicCable;
