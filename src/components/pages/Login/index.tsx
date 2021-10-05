import React from "react";
import { Redirect } from "react-router";
import LoginForm from "../../organisms/LoginForm";
import { useIsLoggedInQuery } from "../../../generated/graphql";

const Login = () => {
  const { loading, data } = useIsLoggedInQuery({ fetchPolicy: "network-only" });
  const viewer = data?.viewer;

  if (loading) {
    return <>Loading ...</>;
  } else if (viewer) {
    return <Redirect to="/" />;
  }

  return <LoginForm />;
};

export default Login;
