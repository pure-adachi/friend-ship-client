import React, { useEffect, useRef } from "react";
import { useWebRTCReceive } from "../../../WebRTCReceive";

const TestReciverRoom = () => {
  const { status, stream } = useWebRTCReceive();
  console.log(status, stream);

  const videoElm = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoElm.current) {
      videoElm.current.srcObject = stream;
      console.log(222, stream);
    }
  }, [stream]);

  return (
    <div>
      <h1>TestReciverRoom</h1>
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

export default TestReciverRoom;
