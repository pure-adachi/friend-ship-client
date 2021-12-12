import WebRTC from "../WebRTC";
import PublicCable from "../WebSocket/PublicCable";
import MyCable from "../WebSocket/MyCable";

class WebAgent {
  public rtc: WebRTC;
  private publicCable: PublicCable;
  private myCable: MyCable;

  constructor(
    currentUserId: string,
    handleUpdate: Function,
    handleError: Function
  ) {
    this.rtc = new WebRTC(currentUserId, handleUpdate, handleError);
    this.publicCable = new PublicCable(currentUserId);
    this.myCable = new MyCable(currentUserId);

    this.rtc.publicCable = this.publicCable;
    this.rtc.myCable = this.myCable;
    this.publicCable.rtc = this.rtc;
    this.myCable.rtc = this.rtc;
  }

  public leave() {
    this.publicCable.disconnect();
    this.myCable.disconnect();
  }

  public setup(): Promise<void> {
    return Promise.all([
      this.rtc.setup(),
      this.publicCable.setup(),
      this.myCable.setup(),
    ]).then(() => {
      this.publicCable.notifyOnline();
    });
  }
}

export default WebAgent;
