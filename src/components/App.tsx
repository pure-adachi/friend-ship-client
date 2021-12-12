import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NotMatch from "./pages/NotMatch";
import { client } from "../middleware";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL ? "friend-ship-client" : ""}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotMatch />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
