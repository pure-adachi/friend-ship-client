import React, { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
}

const Video = ({ stream }: Props) => {
  const videoElm = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoElm.current) {
      videoElm.current.srcObject = stream;
      videoElm.current.muted = true;
      videoElm.current.volume = 0;
      videoElm.current.play();
    }

    return () => stream.getTracks().forEach((track) => track.stop());
  }, [stream]);

  return <video ref={videoElm} autoPlay playsInline />;
};

export default Video;
