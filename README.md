# Bida App

As you make and maintain more projects on GitHub, there is a need for a way to track each project and their dependencies on external libraries. This app aims to create a dashboard where you can check the status of projects and libraries with ease.

## Stack

1. [create-react-app](https://github.com/facebook/create-react-app)
2. served through [netlify](https://www.netlify.com/)
3. authentication via [netlify OAuth](https://www.netlify.com/docs/authenticati
4. gets repository info from [GitHub API v4](https://developer.github.com/v4/) (GraphQL API)
5. gets NPM package info from [NPMS](https://api-docs.npms.io/)

### Why netlify

1. continuous deployment out of the box
2. deploy different branches with different urls
3. enable GitHub OAuth without maintaining a server for redirection.

### Why github API v4 (GraphQL)

This app needs to get a users repositories in GitHub and also the `package.json` file to parse the dependencies of a project. If we were to use github API v3 (REST API), we would call [`/users/:username/repos`](https://developer.github.com/v3/repos/#list-your-repositories) for all repositories of a user and then call [`/repos/:owner/:repo/contents/:path`](https://developer.github.com/v3/repos/contents/#get-contents) for each `package.json` file in each repository. (Which will be N number of fetches depending on how many projects the user has).

By using GraphQL, we can do this in one network call with no over fetching of data as well.

## Environment Variables (.env file)

The environment variables that should be available for this project to work properly

- NETLIFY_SITE_ID (The netlify ID)
