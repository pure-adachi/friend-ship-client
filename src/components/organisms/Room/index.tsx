import React, { useEffect, useRef } from "react";
import { useSocket } from "../../../WebSocket";
import { useWebRTC } from "../../../WebRTC";

const Room = () => {
  const { data } = useSocket();
  const { status: webrtcStatus, stream, setAnswer } = useWebRTC();
  console.log(webrtcStatus, stream);

  useEffect(() => {
    const received: any[] = data.received || [];
    const answer = received[0]?.answer;

    if (answer) {
      setAnswer(JSON.parse(answer));
    }
  }, [data.received, setAnswer]);

  const videoElm = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoElm.current) {
      videoElm.current.srcObject = stream;
      console.log(111, stream);
    }
  }, [stream]);

  return (
    <div>
      <h1>Room</h1>
      <video
        ref={videoElm}
        autoPlay
        muted
        style={{
          background: "black",
        }}
      />
    </div>
  );
};

export default Room;
