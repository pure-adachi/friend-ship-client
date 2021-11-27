import React from "react";
import { useViewerNameQuery } from "../../../generated/graphql";

const ViewerName = () => {
  const { data } = useViewerNameQuery({ fetchPolicy: "network-only" });
  const viewerName = data?.viewer?.name;

  return <div className="text-gray-800">{viewerName}</div>;
};

export default ViewerName;
