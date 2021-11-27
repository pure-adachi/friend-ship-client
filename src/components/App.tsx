import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Main from "./pages/Main";
import TestReciver from "./pages/TestReciver";
import Login from "./pages/Login";
import { client } from "../middleware";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/test-receiver">
            <TestReciver />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
