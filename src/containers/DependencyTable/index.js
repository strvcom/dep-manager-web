// @flow
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { getRepositories } from "../../data/apis";
import Table from "../../components/Table";

const Form = styled.form`
  padding: 10px 0;
`;

class DependencyTable extends Component<*, *> {
  state = {
    user: "strvcom",
    repoName: "",
    data: {}
  };

  componentDidMount = () => {
    this.handleGetNewData();
  };

  handleInputChange = (key: string) => ({
    target
  }: {
    target: HTMLInputElement
  }) => {
    this.setState({ [key]: target.value });
  };

  handleGetNewData = (e: ?Event) => {
    if (e) {
      e.preventDefault();
    }
    const { user, repoName } = this.state;
    this.setState({ data: [] });
    getRepositories(`user:${user} ${repoName} in:name fork:true`).then(data => {
      this.setState({ data });
    });
  };

  render() {
    const { data, user, repoName } = this.state;

    return (
      <Fragment>
        <Form onSubmit={this.handleGetNewData}>
          <label>username: </label>
          <input
            value={user}
            placeholder="username"
            onChange={this.handleInputChange("user")}
          />
          &nbsp;&nbsp;&nbsp;
          <label>repository: </label>
          <input
            value={repoName}
            placeholder="repository"
            onChange={this.handleInputChange("repoName")}
          />
          <button onClick={this.handleGetNewData} type="submit">
            Search
          </button>
        </Form>
        <Table data={data} />
      </Fragment>
    );
  }
}

export default DependencyTable;
