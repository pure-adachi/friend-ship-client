import { useEffect, useReducer } from "react";
import {
  SampleOfferDocument,
  CreateAnswerDocument,
} from "../generated/graphql";
import { client } from "../middleware";

export const useWebRTCReceive = () => {
  interface StatusType {
    status: "ready" | "start" | "startAnswer" | "endAnswer";
    stream: MediaStream | undefined;
  }

  interface ActionType {
    type: "init" | "start" | "startAnswer" | "endAnswer";
    stream?: MediaStream;
  }

  const initialState: StatusType = {
    status: "ready",
    stream: undefined,
  };

  const reducer = (
    state: StatusType,
    { type, stream }: ActionType
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
      case "startAnswer":
        return {
          ...state,
          status: "startAnswer",
        };
      case "endAnswer":
        return {
          ...state,
          status: "endAnswer",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream) => {
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
        const result = await client.query({
          query: SampleOfferDocument,
        });

        const offerId = result.data.sampleOffer.id;
        const sdp = result.data.sampleOffer.sdp;

        const connection = new RTCPeerConnection(config);
        connection.setRemoteDescription(JSON.parse(sdp));

        connection.createAnswer().then(async (answer) => {
          connection.setLocalDescription(answer);

          const sdp = JSON.stringify(answer);
          dispatch({ type: "startAnswer" });

          await client
            .mutate({
              mutation: CreateAnswerDocument,
              variables: { sdp, offerId },
            })
            .then(() => {
              dispatch({ type: "endAnswer" });
            });
        });
      });
  }, []);

  return state;
};
