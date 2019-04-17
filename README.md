<p align="center">
  <img title="Bida App" alt="Bida App" src="https://emoji.slack-edge.com/T024TJQD8/bida/c0dadfe69d7ed5f9.png" />
</p>

<h2 align="center">Project Quality Tracker</h2>

### Outline

As you make and maintain more projects over time, each of them depending on external, usually open-sourced libraries, it's easy to loose track of the quality of those dependencies. Security issues arise, new versions are released. Also, good practices evolve and take long to reach all projects.

Bida App aims to create a dashboard of project's health to manage outdate status for dependencies and compliance with good practices.

### Target Audience

#### Managers

- As a platform leader I would like to have a nice overview of our projects;
- I need to know which project are up-to-date and which are not;
- I would like to have an overview of libraries used across the organization;
- I would like to know if forbidden libraries are used. If so, on which projects;
- I would like to enforce some best practises across projects. For example by using [code-quality-tools](https://github.com/strvcom/code-quality-tools), TypeScript, or tests. By using Bida App I can easily explore which project do not comply to our best practises.

#### Developers

- Simple way to explore what kind of libraries we are using across projects.
  - Easily find if a library is in use elsewhere, and who could help me with that;
  - Find troubleshooting for libraries on specific version.
- Find issues with dependencies before they go live;
- Explore library trends and usage history within organization.

## Table of Contents

<!--toc-start-->

- [Workflow](docs/00-flow.md#workflow)
  - [1. Create issues](docs/00-flow.md#1-create-issues)
  - [2. Backlog](docs/00-flow.md#2-backlog)
  - [3. Ready for dev](docs/00-flow.md#3-ready-for-dev)
  - [4. In progress](docs/00-flow.md#4-in-progress)
  - [5. Approval](docs/00-flow.md#5-approval)
  - [6. Done](docs/00-flow.md#6-done)

- [Stack &amp; Whys](docs/01-stack.md#stack--whys)
  - [Built with](docs/01-stack.md#built-with)
  - [Decisions](docs/01-stack.md#decisions)
    - [Why netlify](docs/01-stack.md#why-netlify)
    - [Why GraphQL](docs/01-stack.md#why-graphql)
    - [Why Apollo](docs/01-stack.md#why-apollo)
    - [Why <a href="https://npms.io/" rel="nofollow">npms</a>](docs/01-stack.md#why-npms)

- [Development Guidelines](docs/02-development.md#development-guidelines)
  - [Getting started](docs/02-development.md#getting-started)
    - [Isolated environments](docs/02-development.md#isolated-environments)
  - [Environment Variables](docs/02-development.md#environment-variables)
  - [Version control](docs/02-development.md#version-control)
    - [Branch](docs/02-development.md#branch)
    - [Commit](docs/02-development.md#commit)
    - [Integration](docs/02-development.md#integration)
      - [<em>Squash and merge</em>](docs/02-development.md#squash-and-merge)

- [Alternative Softwares](docs/03-alternatives.md#alternative-softwares)
  - [<a href="https://snyk.io/" rel="nofollow">snyk</a>](docs/03-alternatives.md#snyk)
  - [<a href="https://libraries.io/" rel="nofollow">Libraries.io</a>](docs/03-alternatives.md#librariesio)
  - [<a href="https://probely.com/" rel="nofollow">Probe.ly</a>](docs/03-alternatives.md#probely)
  - [<a href="https://greenkeeper.io" rel="nofollow">Greenkeeper</a>](docs/03-alternatives.md#greenkeeper)


<!--toc-end-->
