// @flow
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { getRepositories } from "../../data/apis";
import Table from "../../components/Table";
import Loading from "../../components/Loading";

const Form = styled.form`
  padding: 10px 0;
  margin-left: 20px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class DependencyTable extends Component<*, *> {
  state = {
    user: "strvcom",
    repoName: "",
    data: {},
    isLoading: true,
    filter: "All",
    filteredData: null
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
    this.setState({ data: {}, isLoading: true });
    getRepositories(`user:${user} ${repoName} in:name fork:true`).then(data => {
      // console.log("state data", data);
      this.setState({
        data,
        isLoading: false,
        filter: "All",
        filteredData: null
      });
    });
  };

  handleFilterChange = ({ target }: { target: HTMLSelectElement }) => {
    const { value } = target;

    if (value === "All") {
      return this.setState({ filter: value, filteredData: null });
    }
    const { data: { groups, libs, repoNames, versions } } = this.state;
    let startIndex;
    let endIndex;
    groups.every((group, index) => {
      if (startIndex !== undefined && group) {
        endIndex = index;
        return false;
      }
      if (group === value) {
        startIndex = index;
      }
      return true;
    });

    const filteredData = {
      groups: groups.slice(startIndex, endIndex),
      libs: libs.slice(startIndex, endIndex),
      repoNames,
      versions: versions.map(version => version.slice(startIndex, endIndex))
    };
    this.setState({ filter: value, filteredData });
  };

  render() {
    const {
      isLoading,
      data,
      filter,
      filteredData,
      user,
      repoName
    } = this.state;

    return (
      <Fragment>
        <Controls>
          <label>Filter by group</label>
          <select onChange={this.handleFilterChange} value={filter}>
            <option value="All">All</option>
            <option value="Core">Core</option>
            <option value="State">State</option>
            <option value="Etc">Etc</option>
          </select>
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
        </Controls>
        {isLoading && <Loading />}
        {!isLoading && <Table data={filteredData || data} />}
      </Fragment>
    );
  }
}

export default DependencyTable;
