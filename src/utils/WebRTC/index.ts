import PublicCable from "../WebSocket/PublicCable";
import MyCable from "../WebSocket/MyCable";
import { WebRTCTypes } from "../../types";

class WebRTC {
  public publicCable: PublicCable | null = null;
  public myCable: MyCable | null = null;
  public localStream: WebRTCTypes.Stream = null;
  public peerConnections: WebRTCTypes.PeerConnections = {};
  private connectionConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
    ],
  };
  private currentUserId: string;
  private isEnableAudio: boolean = true;
  private isEnableVideo: boolean = true;
  private handleUpdate: Function;
  private handleError: Function;
  private audioInputId: string = "";
  private audioOutputId: string = "";
  private videoInputId: string = "";

  constructor(
    currentUserId: string,
    handleUpdate: Function,
    handleError: Function
  ) {
    this.currentUserId = currentUserId;
    this.handleUpdate = handleUpdate;
    this.handleError = handleError;
  }

  public setup(): Promise<void> {
    return new Promise(async (resolve) => {
      await navigator.mediaDevices
        .getUserMedia({
          audio: this.isEnableAudio && { deviceId: this.audioInputId },
          video: this.isEnableVideo && { deviceId: this.videoInputId },
        })
        .then((stream) => {
          this.localStream = stream;
          resolve();
        })
        .catch((e) => {
          this.handleError(e.message);
        });
    });
  }

  public connect(userGuid: string) {
    const channelName = `channel-${this.currentUserId}_${userGuid}`;
    this.peerConnections[userGuid] = this.initPeerConnection(
      userGuid,
      channelName,
      (sdp: string) => {
        this.myCable?.send("offer", {
          sdp,
          receiverGuid: userGuid,
        });
      }
    );

    this.createOffer(userGuid);
  }

  public disconnect(userGuid: string) {
    if (this.peerConnections[userGuid]) {
      this.peerConnections[userGuid].channel.close();
      const videoTracks =
        this.peerConnections[userGuid].videoStream?.getTracks() || [];
      const audioTracks =
        this.peerConnections[userGuid].audioStream?.getTracks() || [];
      const traks = [...videoTracks, ...audioTracks];
      traks.forEach((track) => {
        track.stop();
      });
      delete this.peerConnections[userGuid];

      this.handleUpdate();
    }
  }

  public setOffer(senderGuid: string, sdp: string) {
    if (this.peerConnections[senderGuid]) this.disconnect(senderGuid);

    const description = new RTCSessionDescription({
      type: "offer",
      sdp,
    });

    const channelName = `channel-${senderGuid}_${this.currentUserId}`;
    this.peerConnections[senderGuid] = this.initPeerConnection(
      senderGuid,
      channelName,
      (sdp: string) => {
        this.myCable?.send("answer", {
          sdp,
          receiverGuid: senderGuid,
        });
      }
    );

    this.peerConnections[senderGuid].connection
      .setRemoteDescription(description)
      .then(() => {
        this.createAnswer(senderGuid);
      });
  }

  public setAnswer(senderGuid: string, sdp: string) {
    const description = new RTCSessionDescription({
      type: "answer",
      sdp,
    });

    this.peerConnections[senderGuid].connection
      .setRemoteDescription(description)
      .catch((e) => {
        console.log(
          "error setRemoteDescription",
          e,
          this.peerConnections[senderGuid]
        );
      });
  }

  public changeDevise({
    audioInputId,
    videoInputId,
  }: {
    audioInputId?: string;
    audioOutputId?: string;
    videoInputId?: string;
  }): Promise<MediaStream> {
    this.audioInputId = audioInputId || this.audioInputId;
    this.videoInputId = videoInputId || this.videoInputId;

    const options = {
      audio: this.isEnableAudio && { deviceId: this.audioInputId },
      video: this.isEnableVideo && { deviceId: this.videoInputId },
    };

    return navigator.mediaDevices.getUserMedia(options).then((stream) => {
      return (this.localStream = stream);
    });
  }

  private initPeerConnection(
    userGuid: string,
    channelName: string,
    callbackSdp: Function
  ): WebRTCTypes.PeerConnection {
    const connection = new RTCPeerConnection(this.connectionConfig);
    const channel = connection.createDataChannel(channelName);

    connection.onicecandidate = (event) => {
      if (!event.candidate && connection.localDescription?.sdp) {
        callbackSdp(connection.localDescription.sdp);
      }
    };

    if (userGuid === "VXNlci0y") {
      connection.onnegotiationneeded = (event) => {
        console.log("onnegotiationneeded", event);

        if (!this.peerConnections[userGuid].connection.localDescription) return;
        if (!this.peerConnections[userGuid].connection.remoteDescription)
          return;

        // Add Trackした時に通る
        console.log("onnegotiationneeded add track", event);

        this.createOffer(userGuid).then((sessionDescription) => {
          const str = JSON.stringify(sessionDescription);
          this.peerConnections[userGuid].channel.send(str);
        });
      };
    }

    connection.ontrack = (event) => {
      console.log("ontrack", event);

      const stream = event.streams[0];
      const track = event.track;

      if (track.kind === "video") {
        this.peerConnections[userGuid].videoStream = stream;
      } else if (track.kind === "audio") {
        this.peerConnections[userGuid].audioStream = stream;
      }

      this.handleUpdate();
    };

    connection.ondatachannel = (event) => {
      // datachannel open時に通る
      console.log("ondatachannel", event);
      this.peerConnections[userGuid].channel = event.channel;

      this.addVideoTrack(userGuid);
      this.addAudioTrack(userGuid);
    };

    channel.onopen = () => {
      console.log("datachannel open");
    };

    channel.onclose = () => {
      console.log("datachannel close");
    };

    channel.onerror = (e) => {
      console.log("datachannel error", e);
    };

    channel.onmessage = (event) => {
      const msg = event.data;
      const obj = JSON.parse(msg);

      if (obj.type === "text") {
        console.log("onmessage text", msg);
      } else if (obj.type === "offer") {
        console.log("onmessage offer");
        this.peerConnections[userGuid].connection
          .setRemoteDescription(obj)
          .then(() => {
            console.log("create answer");
            this.createAnswer(userGuid).then((sessionDescription) => {
              console.log("created answer");
              const str = JSON.stringify(sessionDescription);
              this.peerConnections[userGuid].channel.send(str);
            });
          });
      } else if (obj.type === "answer") {
        console.log("onmessage answer");
        this.peerConnections[userGuid].connection.setRemoteDescription(obj);
      }
    };

    return {
      connection,
      channel,
      volume: 0.5,
    };
  }

  private createOffer(userGuid: string) {
    return this.peerConnections[userGuid].connection
      .createOffer({})
      .then((sessionDescription) => {
        this.peerConnections[userGuid].connection.setLocalDescription(
          sessionDescription
        );

        return sessionDescription;
      });
  }

  private createAnswer(userGuid: string) {
    return this.peerConnections[userGuid].connection
      .createAnswer({})
      .then((sessionDescription) => {
        this.peerConnections[userGuid].connection.setLocalDescription(
          sessionDescription
        );

        return sessionDescription;
      });
  }

  private addVideoTrack(userGuid: string) {
    // navigator.mediaDevices
    //   .getUserMedia({
    //     video: { deviceId: { exact: this.videoId } },
    //   })
    //   .then((stream) => {
    if (!this.localStream) return;
    // this.localStream = stream;
    // debugger;
    // this.handleUpdate();

    const track = this.localStream.getVideoTracks()[0];
    // const track = stream.getVideoTracks()[0];
    this.peerConnections[userGuid].connection.addTrack(track, this.localStream);
    // });
  }

  private addAudioTrack(userGuid: string) {
    if (!this.localStream) return;

    const track = this.localStream.getAudioTracks()[0];
    this.peerConnections[userGuid].connection.addTrack(track, this.localStream);
  }
}

export default WebRTC;
