// @flow
import React, { Component } from "react";

import client from "../../apolloClient";
import { REPOSITORIES_QUERY } from "../../data/queries";
import refineData from "../../data/helpers";

import Table from "../../components/Table";

class DependencyTable extends Component<*, *> {
  state = { data: {} };

  componentDidMount = () => {
    client
      .query({
        query: REPOSITORIES_QUERY,
        variables: {
          query: `user:strvcom fork:true`
        }
      })
      .then(({ data }) => {
        refineData(data).then(refined => {
          this.setState({ data: refined });
        });
      });
  };

  render() {
    const { data } = this.state;

    return <Table data={data} />;
  }
}

export default DependencyTable;
