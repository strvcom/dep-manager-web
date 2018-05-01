// @flow
import React, { Fragment, Component } from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { sort, descend, prop } from "ramda";
import { format, isAfter, addMonths } from "date-fns";

import { getRepositories } from "../../data/apis";

import LibraryDetail from "../../containers/LibraryDetail";
import ProjectDetail from "../../containers/ProjectDetail";

import SubNav from "../../components/SubNav";
import Libraries from "../../components/Tables/Libraries";
import Projects from "../../components/Tables/Projects";
import { Overview, Status, RecentUpdates } from "../../components/Widgets";
import Loading from "../../components/Loading";

const StyledDashboard = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
`;

const WidgetContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

export default class Dashboard extends Component<*, *> {
  state = {
    projects: {},
    latestLibraries: {},
    projectLibraryRelation: [],
    filteredProjects: [],
    filteredLibraries: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const {
      projects,
      latestLibraries,
      projectLibraryRelation
    } = await getRepositories(`user:strvcom fork:true`);

    const projectNameList = Object.keys(projects);

    const filteredProjects = projectNameList.map(projectName => {
      const project = projects[projectName];
      const relatedLibraries = projectLibraryRelation.filter(
        relation => relation.projectName === projectName
      );
      return {
        name: projectName,
        lastActive: format(project.lastActive, "MMM D, YYYY"),
        status: {
          outDated: relatedLibraries.filter(lib => lib.status === "major")
            .length,
          alerts: relatedLibraries.filter(lib => lib.status === "minor").length
        }
      };
    });

    const libraryNameList = Object.keys(latestLibraries);
    const filteredLibraries = libraryNameList.map(libraryName => {
      const library = latestLibraries[libraryName];
      const relatedProjects = projectLibraryRelation.filter(
        relation => relation.libraryName === libraryName
      );
      return {
        name: library.name,
        url: library.url,
        group: library.group,
        totalUsed: relatedProjects.length,
        version: library.version,
        updatedAt: library.updatedAt,
        status: {
          outDated: relatedProjects.filter(
            relation => relation.status === "major"
          ).length,
          alerts: relatedProjects.filter(
            relation => relation.status === "minor"
          ).length
        }
      };
    });
    const archiveCondition = addMonths(new Date(), -1);

    // const sortByUpdatedTime = ;

    const recentLibraries = sort(
      descend(prop("updatedAt")),
      filteredLibraries.filter(lib => isAfter(lib.updatedAt, archiveCondition))
    );

    const activeProjects = projectNameList.filter(name =>
      isAfter(projects[name].lastActive, archiveCondition)
    );

    const projectOverview = {
      total: projectNameList.length,
      active: activeProjects.length
    };

    const upToDateProjectLibraries = projectLibraryRelation.filter(
      relation => relation.status === "upToDate"
    );

    const librariesStatus = {
      totalUsed: projectLibraryRelation.length,
      upToDate: upToDateProjectLibraries.length
    };

    this.setState({
      isLoading: false,
      filteredProjects,
      filteredLibraries,
      recentLibraries,
      projectOverview,
      librariesStatus,
      projects,
      latestLibraries,
      projectLibraryRelation
    });
  };

  render() {
    const {
      filteredProjects,
      filteredLibraries,
      recentLibraries,
      projectOverview,
      librariesStatus,
      projects,
      latestLibraries,
      projectLibraryRelation,
      isLoading
    } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Fragment>
        <SubNav projects={projects} libraries={latestLibraries} />
        <StyledDashboard>
          <Container>
            <Route
              path="/:department/:category"
              exact
              render={({ match }) => (
                <WidgetContainer>
                  <Overview width="32%" projectOverview={projectOverview} />
                  <Status width="32%" librariesStatus={librariesStatus} />
                  <RecentUpdates
                    width="32%"
                    match={match}
                    recentLibraries={recentLibraries}
                  />
                </WidgetContainer>
              )}
            />
            <Switch>
              <Route
                path="/:department/library/:name"
                render={({ match, history }) => (
                  <LibraryDetail
                    relatedProjects={projectLibraryRelation.filter(
                      relation =>
                        relation.libraryName ===
                        decodeURIComponent(match.params.name)
                    )}
                    match={match}
                    history={history}
                    recentLibraries={recentLibraries}
                  />
                )}
              />
              <Route
                path="/:department/project/:name"
                render={({ match, history }) => (
                  <ProjectDetail
                    relatedLibraries={projectLibraryRelation.filter(
                      relation => relation.projectName === match.params.name
                    )}
                    match={match}
                    history={history}
                    recentLibraries={recentLibraries}
                  />
                )}
              />
              <Route
                path="/:department/libraries"
                render={({ history, match }) => (
                  <Libraries
                    history={history}
                    match={match}
                    libraries={filteredLibraries}
                  />
                )}
              />
              <Route
                path="/:department/projects"
                render={({ history, match }) => (
                  <Projects
                    history={history}
                    match={match}
                    projects={filteredProjects}
                  />
                )}
              />
              <Redirect to="/frontend/libraries" />
            </Switch>
          </Container>
        </StyledDashboard>
      </Fragment>
    );
  }
}
