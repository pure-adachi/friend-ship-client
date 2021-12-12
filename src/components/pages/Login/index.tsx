import React from "react";
import { Redirect } from "react-router";
import LoginForm from "../../organisms/LoginForm";
import { useViewerIdQuery } from "../../../generated/graphql";

const Login = () => {
  const { loading, data } = useViewerIdQuery({ fetchPolicy: "network-only" });
  const viewer = data?.viewer;

  if (loading) {
    return <>Loading ...</>;
  } else if (viewer) {
    return <Redirect to="/" />;
  }

  return <LoginForm />;
};

export default Login;
