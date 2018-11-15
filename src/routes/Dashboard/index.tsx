import React, { Fragment, Component } from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { sort, prop, descend } from 'ramda'
import { format, isAfter, addMonths } from 'date-fns'
import { getRepositories } from '../../data/Repository/methods'
import LibraryDetail from '../../containers/LibraryDetail'
import ProjectDetail from '../../containers/ProjectDetail'
import Libraries from '../../components/Tables/Libraries'
import Projects from '../../components/Tables/Projects'
import { Overview, Status, RecentUpdates } from '../../components/Widgets'
import Loading from '../../components/Loading'
import * as helpers from '../../data/helpers'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { DashboardToolBar, DashboardNameToolBar } from './ToolBar'
// import StatusCell from '../../components/Tables/StatusCell'
import * as routes from '../routes'
import { ProjectTable } from './Tables'
import { Project } from '../../data/types'

interface DashboardState {
  projects: helpers.Projects
  latestLibraries: helpers.Libraries
  projectLibraryRelation: helpers.ProjectLibraryRelation[]
  filteredProjects: any[]
  filteredLibraries: any[]
  isLoading: boolean
  recentLibraries: any[]
  projectOverview?: {
    total: number
    active: number
  }
  librariesStatus?: {
    totalUsed: number
    upToDate: number
  }
}

export type DashboardProps = RouteComponentProps<{
  department: routes.Department
  category: routes.Category
}>

export const DashboardNew = React.memo((props: DashboardProps) => {
  const {
    match: {
      params: { category, department }
    }
  } = props
  const handleRowClick = React.useCallback(
    (project: Project) =>
      props.history.push(`/${department}/${category}/${project.name}`),
    []
  )
  return (
    <React.Fragment>
      <Switch>
        <Route path={routes.dashboardItem} component={DashboardNameToolBar} />
        <Route path={routes.dashboardItems} component={DashboardToolBar} />
      </Switch>
      <StyledDashboard>
        <TableContainer>
          <React.Suspense fallback={<Loading />}>
            {category === routes.Category.PROJECTS && (
              <ProjectTable
                onRowClick={handleRowClick}
                department={department}
              />
            )}
          </React.Suspense>
        </TableContainer>
      </StyledDashboard>
    </React.Fragment>
  )
})

export default DashboardNew

export class Dashboard extends Component<RouteComponentProps, DashboardState> {
  public readonly state: DashboardState = {
    projects: {},
    latestLibraries: {},
    projectLibraryRelation: [],
    filteredProjects: [],
    filteredLibraries: [],
    isLoading: true,
    recentLibraries: []
  }

  public componentDidMount = async () => {
    const {
      projects,
      latestLibraries,
      projectLibraryRelation
    } = await getRepositories(`user:strvcom fork:true`)

    const projectNameList = Object.keys(projects)

    const filteredProjects = projectNameList.map(projectName => {
      const project = projects[projectName]
      const relatedLibraries = projectLibraryRelation.filter(
        relation => relation.projectName === projectName
      )
      return {
        name: projectName,
        lastActive: format(project.lastActive, 'MMM D, YYYY'),
        status: {
          outDated: relatedLibraries.filter(lib => lib.status === 'major')
            .length,
          alerts: relatedLibraries.filter(lib => lib.status === 'minor').length
        }
      }
    })

    const libraryNameList = Object.keys(latestLibraries)
    const filteredLibraries = libraryNameList.map(libraryName => {
      const library = latestLibraries[libraryName]
      const relatedProjects = projectLibraryRelation.filter(
        relation => relation.libraryName === libraryName
      )
      return {
        name: library.name,
        url: library.url,
        group: library.group,
        totalUsed: relatedProjects.length,
        version: library.version,
        updatedAt: library.updatedAt,
        status: {
          outDated: relatedProjects.filter(
            relation => relation.status === 'major'
          ).length,
          alerts: relatedProjects.filter(
            relation => relation.status === 'minor'
          ).length
        }
      }
    })
    const archiveCondition = addMonths(new Date(), -1)
    // const sortByUpdatedTime = ;
    const recentLibraries = sort(
      descend(prop<any, any>('updatedAt')),
      filteredLibraries.filter(lib => isAfter(lib.updatedAt, archiveCondition))
    )

    const activeProjects = projectNameList.filter(name =>
      isAfter(projects[name].lastActive, archiveCondition)
    )

    const projectOverview = {
      total: projectNameList.length,
      active: activeProjects.length
    }

    const upToDateProjectLibraries = projectLibraryRelation.filter(
      relation => relation.status === 'upToDate'
    )

    const librariesStatus = {
      totalUsed: projectLibraryRelation.length,
      upToDate: upToDateProjectLibraries.length
    }

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
    })
  }

  public render () {
    const {
      filteredProjects,
      filteredLibraries,
      recentLibraries,
      projectOverview,
      librariesStatus,
      // projects,
      // latestLibraries,
      projectLibraryRelation,
      isLoading
    } = this.state
    if (isLoading) return <Loading />
    return (
      <Fragment>
        {/* <SubNav projects={projects} libraries={latestLibraries} /> */}
        <StyledDashboard>
          <TableContainer>
            <Route
              path='/:department/:category'
              exact
              render={props => (
                <WidgetContainer>
                  <Overview width='32%' projectOverview={projectOverview!} />
                  <Status width='32%' librariesStatus={librariesStatus!} />
                  <RecentUpdates
                    width='32%'
                    {...props}
                    recentLibraries={recentLibraries}
                  />
                </WidgetContainer>
              )}
            />
            <Switch>
              <Route
                path='/:department/library/:name'
                render={props => (
                  <LibraryDetail
                    relatedProjects={projectLibraryRelation.filter(
                      relation =>
                        relation.libraryName ===
                        decodeURIComponent(props.match.params.name)
                    )}
                    {...props}
                  />
                )}
              />
              <Route
                path='/:department/project/:name'
                render={props => (
                  <ProjectDetail
                    relatedLibraries={projectLibraryRelation.filter(
                      relation =>
                        relation.projectName === props.match.params.name
                    )}
                    {...props}
                    recentLibraries={recentLibraries}
                  />
                )}
              />
              <Route
                path='/:department/libraries'
                render={props => (
                  <Libraries {...props} libraries={filteredLibraries} />
                )}
              />
              <Route
                path='/:department/projects'
                render={props => (
                  <Projects {...props} projects={filteredProjects} />
                )}
              />
              <Redirect to='/frontend/libraries' />
            </Switch>
          </TableContainer>
        </StyledDashboard>
      </Fragment>
    )
  }
}
