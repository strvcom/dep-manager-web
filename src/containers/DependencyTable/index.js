// @flow
import React, { Component } from "react";

import { getRepositories } from "../../data/apis";

import Table from "../../components/Table";

class DependencyTable extends Component<*, *> {
  state = { data: {} };

  componentDidMount = () => {
    getRepositories(`user:strvcom fork:true`).then(data => {
      this.setState(() => ({ data }));
    });
  };

  render() {
    const { data } = this.state;

    return <Table data={data} />;
  }
}

export default DependencyTable;
