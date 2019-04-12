# Bida App [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) ![Dependencies](https://david-dm.org/strvcom/dep-manager-web.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

As you make and maintain more projects on github, there is a need for a way to track each project and their dependencies on external libraries. This app aims to create a dashboard where you can check the status of projects and libraries with ease.

## Current stack

1. [create-react-app](https://github.com/facebook/create-react-app)
2. served through [netlify](https://www.netlify.com/)
3. authentication via [github OAuth](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)
4. gets repository info from github API v4([GraphQL API](https://developer.github.com/v4/))

### Why netlify

1. continuous deployment out of the box
2. deploy different branches with different urls
3. enable github OAuth without maintaining a server for redirection.

### Why github API v4 (GraphQL)

This app needs to get a users repositories in github and also the `package.json` file to parse the dependencies of a project. If we were to use github API v3 (REST API), we would call [`/users/:username/repos`](https://developer.github.com/v3/repos/#list-your-repositories) for all repositories of a user and then call [`/repos/:owner/:repo/contents/:path`](https://developer.github.com/v3/repos/contents/#get-contents) for each `package.json` file in each repository. (Which will be N number of fetches depending on how many projects the user has)  
By utilizing GraphQL endpoint we can do this in one network call with no over fetching of data as well.

## Environment Variables (.env file)

The environment variables that should be available for this project to work properly

- NETLIFY_SITE_ID (The netlify ID)
