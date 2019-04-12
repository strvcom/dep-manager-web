# Bida App

As you make and maintain more projects on GitHub, there is a need for a way to track each project and their dependencies on external libraries. This app aims to create a dashboard where you can check the status of projects and libraries with ease.

## Getting started

**Clone repository**

```sh
git clone git@github.com:strvcom/dep-manager-web.git
cd dep-manager-web
```

**Install**

```sh
yarn
```

**Run locally**

```sh
yarn start
```

### Version control

- Develop each new feature or bug fix in a new branch.
  - Follow the `issue/[issue-number]` naming convention referencing a already created issue, when possible;
  - Use `hotfix/[description]` for fixing production bugs;
  - Use `feat/[description]` for anything else.
- Use [`git-semmantic-commits`](https://seesparkbox.com/foundry/semantic_commit_messages) for standardized commit messages;
- Create pull-request for integration.
  - Use the GitHub API to integrate code;
  - Use _squash & merge_ merging technique;

## Stack

1. [create-react-app](https://github.com/facebook/create-react-app)
2. Served through [netlify](https://www.netlify.com/)
3. Authenticated via [netlify OAuth](https://www.netlify.com/docs/authentication-providers/)
4. Load repository info from [GitHub API v4](https://developer.github.com/v4/) (GraphQL API)
5. Load NPM package info from [NPMS API](https://api-docs.npms.io/)

### Why netlify

1. Continuous deployment out of the box;
2. Immutable deploys (each deploy/branch has it's own URL);
3. GitHub OAuth with no dedicated server.

### Why github API v4 (GraphQL)

This app needs to get a users repositories in GitHub and also the `package.json` file to parse the dependencies of a project. If we were to use github API v3 (REST API), we would call [`/users/:username/repos`](https://developer.github.com/v3/repos/#list-your-repositories) for all repositories of a user and then call [`/repos/:owner/:repo/contents/:path`](https://developer.github.com/v3/repos/contents/#get-contents) for each `package.json` file in each repository. (Which will be N number of fetches depending on how many projects the user has).

By using GraphQL, we can do this in one network call with no over fetching of data as well.

## Environment Variables

You can define these variables either prefixing any command, or by setting a [`.env`](https://github.com/motdotla/dotenv) file.

| Variable             | Used for                             | Where to find                                                                 | Target        |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------------- | ------------- |
| `NETLIFY_SITE_ID`    | Authenticate using netlify           | `https://app.netlify.com/sites/[site-name]/settings/general#site-information` | `production`  |
| `ENGINE_API_KEY`     | Tracking query execution performance | `https://engine.apollographql.com/service/[service name]/settings`            | `development` |
| `GITHUB_OAUTH_TOKEN` | Running isolated API locally         | `https://github.com/settings/tokens`                                          | `development` |