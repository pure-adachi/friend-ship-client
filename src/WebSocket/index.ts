import { useEffect, useReducer } from "react";
import ActionCable from "actioncable";

export const useSocket = () => {
  interface DataType {
    cable: ActionCable.Cable | null;
    received: any;
  }
  interface StatusType {
    loading: boolean;
    data: DataType;
    error: Error | null;
  }

  interface ActionType {
    type: "init" | "start" | "connected" | "error" | "received";
    data?: any;
    error?: Error | unknown | null;
  }

  const initialState: StatusType = {
    loading: false,
    error: null,
    data: {
      cable: null,
      received: [],
    },
  };

  const reducer = (state: StatusType, { type, data, error }: ActionType) => {
    switch (type) {
      case "init":
        return { ...initialState };
      case "start":
        return {
          ...state,
          loading: true,
          data: {
            ...state.data,
            ...data,
          },
        };
      case "connected":
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            ...data,
          },
        };
      case "received":
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            received: [...state.data.received, data.message],
          },
        };
      default:
        return { ...state, error: new Error("no such action type") };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const token = localStorage.getItem("access_token");
  const url = `${process.env.REACT_APP_SERVER_URL}/cable?access_token=${token}`;

  useEffect(() => {
    let dispatchSafe = (action: ActionType) => dispatch(action);

    (async () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          dispatch({ type: "start", data: { stream } });
        });

      try {
        const cable = ActionCable.createConsumer(url);

        cable.subscriptions.create<any>("PostChannel", {
          connected() {
            dispatchSafe({ type: "connected", data: { cable } });
          },
          received(message: any) {
            dispatchSafe({ type: "received", data: { message } });
          },
        });
      } catch (error) {
        dispatchSafe({ type: "error", error });
      }
    })();

    return () => {
      dispatchSafe = () => null;
      dispatch({ type: "init" });
    };
  }, [url]);

  return state;
};
