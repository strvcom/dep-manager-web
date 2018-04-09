// @flow
import React from "react";
import { withState } from "recompose";
import { Query } from "react-apollo";

import { ME_QUERY } from "./data/queries";
import Login from "./Login";
import Header from "./components/Header";
import DependencyTable from "./containers/DependencyTable";

const App = ({ token, setToken }: { token: String, setToken: Function }) => {
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Query query={ME_QUERY} fetchPolicy="network-only">
      {({ client, loading, error, data: { viewer } = {} }) => {
        if (error) {
          setToken(null);
          return <Login setToken={setToken} />;
        }
        if (loading) {
          return <p>Loading...</p>;
        }
        if (viewer) {
          return (
            <div>
              <Header
                viewer={viewer}
                onLogout={() => {
                  localStorage.clear();
                  client.resetStore();
                  setToken(null);
                }}
              />
              <DependencyTable />
            </div>
          );
        }
        return <Login setToken={setToken} />;
      }}
    </Query>
  );
};

export default withState("token", "setToken", localStorage.getItem("token"))(
  App
);
