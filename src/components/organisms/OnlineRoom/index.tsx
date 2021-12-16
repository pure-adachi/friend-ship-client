import React from "react";
import WebRTCRoom from "../../molecules/WebRTCRoom";
import { useViewerQuery } from "../../../generated/graphql";

const OnlineRoom = () => {
  const { loading, data } = useViewerQuery({
    fetchPolicy: "network-only",
  });
  const userId = data?.viewer?.id;
  const userName = data?.viewer?.name;

  if (loading) {
    return <>Loading ...</>;
  } else if (!userId) {
    return <>Failed</>;
  } else {
    return (
      <WebRTCRoom currentUserId={userId} currentUserName={userName || ""} />
    );
  }
};

export default OnlineRoom;
