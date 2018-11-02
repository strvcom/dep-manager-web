import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "./globalStyles";
import "react-virtualized/styles.css";
import './test'

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import apolloClient from "./apolloClient";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
