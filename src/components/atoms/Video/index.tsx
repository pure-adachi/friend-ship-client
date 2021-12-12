import React, { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
}

const Video = ({ stream }: Props) => {
  const videoElm = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoElm.current) {
      videoElm.current.srcObject = stream;
      videoElm.current.play();
      videoElm.current.volume = 0;
    }

    return () => stream.getTracks().forEach((track) => track.stop());
  }, [stream]);

  return <video ref={videoElm} autoPlay />;
};

export default Video;
