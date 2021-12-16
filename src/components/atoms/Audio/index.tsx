import React, { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
  volume: number;
  audioOutputId: string;
}

interface HTMLMediaElement extends HTMLAudioElement {
  setSinkId: (sinkId: string) => Promise<undefined>;
}

const Audio = ({ stream, volume, audioOutputId }: Props) => {
  // const audioElm = useRef<any>(null);
  const audioElm = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (audioElm.current) {
      audioElm.current.srcObject = stream;
      audioElm.current.play();
      audioElm.current.volume = volume;
      audioElm.current.setSinkId(audioOutputId);
    }
  }, [stream, volume, audioOutputId]);

  return <audio ref={audioElm} autoPlay controls className="hidden" />;
};

export default Audio;
