export namespace WebSocketTypes {
  export type Cable = (ActionCable.Channel & ActionCable.CreateMixin) | null;
  export interface MessageUserGuid {
    ["user_guid"]: string;
  }

  export interface MessageOffer {
    sdp: string;
    sender_guid: string;
  }

  export interface MessageAnswer {
    sdp: string;
    sender_guid: string;
  }

  // export interface MessageCandidates {
  //   requester_guid: string;
  //   candidates: RTCIceCandidate[];
  // }

  export interface Messages {
    ["online"]: MessageUserGuid;
    ["offline"]: MessageUserGuid;
    ["offer"]: MessageOffer;
    ["answer"]: MessageAnswer;
    // ["offer_candidates"]: MessageCandidates;
    // ["answer_candidates"]: MessageCandidates;
  }
}

export namespace WebRTCTypes {
  export interface PeerConnection {
    connection: RTCPeerConnection;
    channel: RTCDataChannel;
    volume: number;
    videoStream?: MediaStream;
    audioStream?: MediaStream;
  }

  export interface PeerConnections {
    [key: string]: PeerConnection;
    // {
    // connection: RTCPeerConnection;
    // channel?: RTCDataChannel;
    // localStream?: MediaStream;
    // candidates: RTCIceCandidate[];
    // offerSDP?: RTCSessionDescriptionInit;
    // answerSDP?: RTCSessionDescriptionInit;
    // };
  }
  export type Stream = MediaStream | null;
}
