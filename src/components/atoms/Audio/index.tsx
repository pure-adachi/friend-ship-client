import React, { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
  volume: number;
}

const Audio = ({ stream, volume }: Props) => {
  const audioElm = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioElm.current) {
      audioElm.current.srcObject = stream;
      audioElm.current.play();
      audioElm.current.volume = volume;
    }
  }, [stream, volume]);

  return <audio ref={audioElm} autoPlay controls />;
};

export default Audio;
