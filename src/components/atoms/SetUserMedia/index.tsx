import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button";

interface Props {
  joinRoom: (
    audioInputId: string,
    audioOutputId: string,
    videoInputId: string
  ) => void;
}

const SetUserMedia = ({ joinRoom }: Props) => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputs, setAudioOutputs] = useState<MediaDeviceInfo[]>([]);
  const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioInputId, setSelectedAudioInputId] = useState<string>();
  const [selectedAudioOutputId, setSelectedAudioOutputId] = useState<string>();
  const [selectedVideoInputId, setSelectedVideoInputId] = useState<string>();

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const __audioInputs = devices.filter(
        (device) => device.kind === "audioinput"
      );
      const __audioOutputs = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      const __videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setAudioInputs(__audioInputs);
      setAudioOutputs(__audioOutputs);
      setVideoInputs(__videoInputs);

      try {
        const usedDevises = JSON.parse(localStorage.getItem("devises") || "");

        setSelectedAudioInputId(
          devices.find(
            ({ deviceId }) => deviceId === usedDevises.selectedAudioInputId
          )?.deviceId || __audioInputs[0].deviceId
        );
        setSelectedAudioOutputId(
          devices.find(
            ({ deviceId }) => deviceId === usedDevises.selectedAudioOutputId
          )?.deviceId || __audioOutputs[0].deviceId
        );
        setSelectedVideoInputId(
          devices.find(
            ({ deviceId }) => deviceId === usedDevises.selectedVideoInputId
          )?.deviceId || __videoInputs[0].deviceId
        );
      } catch {
        setSelectedAudioInputId(__audioInputs[0].deviceId);
        setSelectedAudioOutputId(__audioOutputs[0].deviceId);
        setSelectedVideoInputId(__videoInputs[0].deviceId);
      }
    });
  }, []);

  const join = () => {
    if (selectedAudioInputId && selectedAudioOutputId && selectedVideoInputId) {
      const devices = {
        selectedAudioInputId,
        selectedAudioOutputId,
        selectedVideoInputId,
      };

      localStorage.setItem("devises", JSON.stringify(devices));

      joinRoom(
        selectedAudioInputId,
        selectedAudioOutputId,
        selectedVideoInputId
      );
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="text-xl pb-3">設定</div>
      <div className="pb-3">
        <div className="pb-1">
          <div className="text-center">入力</div>
          <select
            className="form-select appearance-none block w-full mx-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded"
            onChange={(e) => setSelectedAudioInputId(e.currentTarget.value)}
            value={selectedAudioInputId}
          >
            {audioInputs.map((audioInput, i) => {
              return (
                <option key={i} value={audioInput.deviceId}>
                  {audioInput.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="pb-1">
          <div className="text-center">出力</div>
          <select
            className="form-select appearance-none block w-full mx-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded"
            onChange={(e) => setSelectedAudioOutputId(e.currentTarget.value)}
            value={selectedAudioOutputId}
          >
            {audioOutputs.map((audioOutput, i) => {
              return (
                <option key={i} value={audioOutput.deviceId}>
                  {audioOutput.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="pb-1">
          <div className="text-center">カメラ</div>
          <select
            className="form-select appearance-none block w-full mx-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded"
            onChange={(e) => setSelectedVideoInputId(e.currentTarget.value)}
            value={selectedVideoInputId}
          >
            {videoInputs.map((videoInput, i) => {
              return (
                <option key={i} value={videoInput.deviceId}>
                  {videoInput.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="rounded"
          onClick={join}
          disabled={
            !selectedAudioInputId ||
            !selectedAudioOutputId ||
            !selectedVideoInputId
          }
        >
          参加
        </Button>
      </div>
    </div>
  );
};

export default SetUserMedia;
