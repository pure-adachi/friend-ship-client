import React, { ReactNode } from "react";
import { Redirect } from "react-router";
import { useViewerIdQuery } from "../../../generated/graphql";

interface Props {
  children: ReactNode;
}

const Authentication = ({ children }: Props) => {
  const { loading, data } = useViewerIdQuery({ fetchPolicy: "network-only" });
  const viewer = data?.viewer;

  if (loading) {
    return <>Loading ...</>;
  } else if (!viewer) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default Authentication;
