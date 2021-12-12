import WebSocket from "../../WebSocket";
import { WebSocketTypes } from "../../../types";

class MyCable extends WebSocket {
  public setup(): Promise<void> {
    return new Promise((resolve) => {
      this.cable = this.subscriptions.create("UserChannel", {
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

  public send(command: string, values: Object) {
    this.cable?.perform(command, values);
  }


  private handleMessage(messages: WebSocketTypes.Messages) {
    if (messages.offer) {
      this.handleOfferMessage(messages.offer);
    } else if (messages.answer) {
      this.handleAnswerMessage(messages.answer);
    }
  }

  private handleOfferMessage({
    sdp,
    sender_guid: senderGuid,
  }: WebSocketTypes.MessageOffer) {
    console.log("offer受信");

    this.rtc?.setOffer(senderGuid, sdp);
  }

  private handleAnswerMessage({
    sdp,
    sender_guid: senderGuid,
  }: WebSocketTypes.MessageAnswer) {
    console.log("answer受信");

    this.rtc?.setAnswer(senderGuid, sdp);
  }
}

export default MyCable;
