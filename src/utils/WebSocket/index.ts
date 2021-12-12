import ActionCable from "actioncable";
import WebRTC from "../WebRTC";
import { WebSocketTypes } from "../../types";

class WebSocket {
  public rtc: WebRTC | null;
  protected subscriptions: ActionCable.Subscriptions;
  protected cable: WebSocketTypes.Cable;
  protected currentUserId: string;
  private webSocketUrl: string = `${
    process.env.REACT_APP_SERVER_URL
  }/cable?access_token=${localStorage.getItem("access_token")}`;

  constructor(currentUserId: string) {
    this.rtc = null;
    this.currentUserId = currentUserId;
    this.subscriptions = ActionCable.createConsumer(
      this.webSocketUrl
    ).subscriptions;
    this.cable = null;
  }

  public disconnect() {
    this.cable?.unsubscribe();
  }

  protected notifyOffline() {
    this.cable?.perform("offline", {});
  }
}

export default WebSocket;
