import { useEffect, useReducer } from "react";
import ActionCable from "actioncable";

export const useSocket = () => {
  interface StatusType {
    loading: boolean;
    // data: T | null;
    data: null;
    error: Error | null;
  }

  interface ActionType {
    type: "init" | "start" | "data" | "error";
    // data: T | null;
    data: null;
    error: Error | null;
  }

  const initialState: StatusType = {
    loading: false,
    error: null,
    data: null,
  };

  const reducer = (state: StatusType, { type, data, error }: ActionType) => {
    switch (type) {
      case "init":
        return { ...initialState };
      case "start":
        return { ...state, loading: true };
      case "data":
        return { ...state, loading: false, data };
      case "error":
        return { ...state, loading: false, error };
      default:
        throw new Error("no such action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let dispatchSafe = (action: any) => dispatch(action);
    const abortController = new AbortController();

    (async () => {
      dispatchSafe({ type: "start" });
      try {
        const token = localStorage.getItem("accessToken");
        const cable = ActionCable.createConsumer(
          `${process.env.REACT_APP_SERVER_URL}/cable?access_token=${token}`
        );

        cable.subscriptions.create("PostChannel", {
          connected() {
            dispatchSafe({ type: "data" });
          },
        });
      } catch (error) {
        dispatchSafe({ type: "error", error });
      }
    })();

    return () => {
      dispatchSafe = () => null;
      abortController.abort();
      dispatch({ type: "init", data: null, error: null });
    };
  }, []);

  return state;
};
