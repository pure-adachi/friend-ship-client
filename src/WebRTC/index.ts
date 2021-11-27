import { useEffect, useReducer } from "react";
import { CreateOfferDocument } from "../generated/graphql";
import { client } from "../middleware";

export const useWebRTC = () => {
  interface StatusType {
    status:
      | "ready"
      | "start"
      | "startOffer"
      | "waitingAnswer"
      | "connecting"
      | "connected"
      | "disconnected"
      | "fail";
    stream: MediaStream | undefined;
    setAnswer: (s: RTCSessionDescriptionInit) => void;
  }

  interface ActionType {
    type: "init" | "start" | "startOffer" | "waitingAnswer" | "error";
    callback?: (s: RTCSessionDescriptionInit) => void;
    stream?: MediaStream;
  }

  const initialState: StatusType = {
    status: "ready",
    stream: undefined,
    setAnswer: () => {},
  };

  const reducer = (
    state: StatusType,
    { type, stream, callback }: ActionType
  ): StatusType => {
    switch (type) {
      case "init":
        return { ...initialState };
      case "start":
        return {
          ...state,
          status: "start",
          stream,
        };
      case "startOffer":
        return {
          ...state,
          status: "startOffer",
        };
      case "waitingAnswer":
        const setAnswer = callback || (() => {});
        return {
          ...state,
          status: "waitingAnswer",
          setAnswer,
        };
      case "error":
        return {
          ...state,
          status: "fail",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((stream) => {
        dispatch({ type: "start", stream });

        const config = {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 0,
          iceServers: [
            {
              urls: "stun:stun.l.google.com:19302",
            },
          ],
        };

        const connection = new RTCPeerConnection(config);
        const audioTracks = stream.getAudioTracks();

        if (audioTracks.length) {
          connection.addTrack(audioTracks[0]);

          connection.createOffer().then(async (offer) => {
            connection.setLocalDescription(offer);

            const sdp = JSON.stringify(offer);
            dispatch({ type: "startOffer" });

            await client
              .mutate({
                mutation: CreateOfferDocument,
                variables: { sdp },
              })
              .then(() => {
                dispatch({
                  type: "waitingAnswer",
                  callback: (answer) => connection.setRemoteDescription(answer),
                });
              });
          });

          connection.ontrack = (e) => {
            console.log("ontrack", e);
          };
        } else {
          dispatch({ type: "error" });
        }
      });
  }, []);

  return state;
};
