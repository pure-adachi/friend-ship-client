import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../../organisms/LoginForm";
import { useViewerIdQuery } from "../../../generated/graphql";

const Login = () => {
  const { loading, data } = useViewerIdQuery({ fetchPolicy: "network-only" });
  const viewer = data?.viewer;

  if (loading) {
    return <>Loading ...</>;
  } else if (viewer) {
    return <Navigate to="/" />;
  }

  return <LoginForm />;
};

export default Login;
