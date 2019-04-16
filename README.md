# Bida App

**Quality tracker for inside projects.**

## Introduction

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

- [Stack &amp; Whys](docs/00-stack.md#stack--whys)
  - [Built with](docs/00-stack.md#built-with)
  - [Decisions](docs/00-stack.md#decisions)
    - [Why netlify](docs/00-stack.md#why-netlify)
    - [Why GraphQL](docs/00-stack.md#why-graphql)
    - [Why Apollo](docs/00-stack.md#why-apollo)
    - [Why <a href="https://npms.io/" rel="nofollow">npms</a>](docs/00-stack.md#why-npms)

- [Development Guidelines](docs/01-development.md#development-guidelines)
  - [Getting started](docs/01-development.md#getting-started)
  - [Environment Variables](docs/01-development.md#environment-variables)
  - [Version control](docs/01-development.md#version-control)
    - [Branch](docs/01-development.md#branch)
    - [Commit](docs/01-development.md#commit)
    - [Integration](docs/01-development.md#integration)
      - [<em>Squash and merge</em>](docs/01-development.md#squash-and-merge)

- [Alternative Softwares](docs/02-alternatives.md#alternative-softwares)
  - [<a href="https://snyk.io/" rel="nofollow">snyk</a>](docs/02-alternatives.md#snyk)
  - [<a href="https://libraries.io/" rel="nofollow">Libraries.io</a>](docs/02-alternatives.md#librariesio)
  - [<a href="https://probely.com/" rel="nofollow">Probe.ly</a>](docs/02-alternatives.md#probely)
  - [<a href="https://greenkeeper.io" rel="nofollow">Greenkeeper</a>](docs/02-alternatives.md#greenkeeper)


<!--toc-end-->
