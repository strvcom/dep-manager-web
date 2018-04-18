// @flow
import React, { Fragment } from "react";
import { withState } from "recompose";
import { Query } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ME_QUERY } from "./data/queries";
import Login from "./containers/Login";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import SubNav from "./components/SubNav";
// import Header from "./components/Header";
// import DependencyTable from "./containers/DependencyTable";

const App = ({ token, setToken }: { token: String, setToken: Function }) => {
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Query query={ME_QUERY} fetchPolicy="network-only">
      {({ client, loading, error, data: { viewer } = {} }) => {
        const clearState = () => {
          localStorage.clear();
          client.resetStore();
          setToken(null);
        };

        if (error) {
          clearState();
          return <Login setToken={setToken} />;
        }

        if (loading) {
          return <Loading />;
        }

        if (viewer) {
          return (
            <Router>
              <Fragment>
                <Route path="/" component={Nav} />
                <Route
                  path="/:department"
                  render={({ match }) => <SubNav match={match} />}
                />
                {/* <Header viewer={viewer} onLogout={clearState} /> */}
                {/* <DependencyTable /> */}
              </Fragment>
            </Router>
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
