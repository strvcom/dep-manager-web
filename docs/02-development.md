---
title: Development
description: Developers starting point
---

# Development Guidelines

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

**Set environment**

```sh
cp .env.sample .env
```

Modify `.env` [accordingly](#environment-variables).

**Run locally**

```sh
yarn start
```

### Isolated environments

As the API and App are isolated parts, you can run them without the other as follows:

**API**: `yarn start:lambda`

**App**: `yarn start:app`

Both are useful when you are developing independent parts of the application.

> Keep in mind in the case of the _App_ your are still going to need an API running somewhere. The nice thing is that can be any of your already deployed environments. For instance, you can: `REACT_APP_GRAPHQL_ENDPOINT=https://[netlify-deploy-url]/.netlify/functions/graphql yarn start:app` to use a remote API source.

## Environment Variables

You can define these variables either by prefixing any command, or by setting a [`.env`](https://github.com/motdotla/dotenv) file.

| Variable                     | Required | Used for                             | How to set                                                                    | Default                                            |
| ---------------------------- | -------- | ------------------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| `REACT_APP_NETLIFY_SITE_ID`  | `true`   | Authenticate using netlify           | `https://app.netlify.com/sites/[site-name]/settings/general#site-information` | `f96fd685-82eb-4f99-8955-85c25edfee38`             |
| `REACT_APP_GRAPHQL_ENDPOINT` | `true`   | Connect to GraphQL API               | Should point to a running API, either locally or remote                       | `http://localhost:9000/.netlify/functions/graphql` |
| `GITHUB_ORG_ID`              | `true`   | Loading repository information from  | Should be the unique name of the GitHub organization                          | `strvcom`                                          |
| `GITHUB_APP_ID`              | `true`   | Authorization                        | `https://github.com/settings/apps/[app-name]`                                 |                                                    |
| `GITHUB_APP_CLIENT_ID`       | `true`   | Authorization                        | `https://github.com/settings/apps/[app-name]`                                 |                                                    |
| `GITHUB_APP_CLIENT_SECRET`   | `true`   | Authorization                        | `https://github.com/settings/apps/[app-name]`                                 |                                                    |
| `GITHUB_APP_PRIVATE_KEY`     | `true`   | Authorization                        | `https://github.com/settings/apps/[app-name]`                                 |                                                    |
| `GITHUB_APP_INSTALLATION_ID` | `true`   | Authorization                        | `https://github.com/settings/apps/[app-name]/installations`                   |                                                    |
| `DEBUG`                      | `false`  | Enable debugging messages            | `https://github.com/visionmedia/debug`                                        | `bida*`                                            |
| `ENGINE_API_KEY`             | `false`  | Tracking query execution performance | `https://engine.apollographql.com/service/[service name]/settings`            |                                                    |

## Version control

### Branch

1. All new branches must start from `master` branch;
2. Every branch refers to an existing issue on GitHub;
3. Each new feature or bug fix must be developed in it's own branch;
4. Branches must follow these naming conventions:

   **Feature/Bug**: `issue/[issue]--[short-description]`

   > Used for developing any planned task.

   ~~**Hotfix**: `hotfix/[issue]--[short-description]`~~

   > ~~Used for developing unplanned production bug fixes.~~

   _This will only be used once we have a production version of the application. Before that, bugs should be addressed as common issues._

### Commit

Always use [Semantic Commits](https://seesparkbox.com/foundry/semantic_commit_messages) messages. This ensures automated changelog and clarity on git history.

### Integration

Every branch should eventually generate a pull-request against the `master` branch.

> _We do not use `dev`. Each pull-request is deployed on it's self contained [deploy preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/)_

#### Issue vs Pull-Request redundancy

Usually for every branch/pull-request there will be a single issue previously registered. Though this it not necessarily a problem, nor always true, most of the time things can become redundant. You have to visit more than one place to get enough information for a task; a the least an issue and it's comments, and a pull-request in response to that.

We can transform an _issue_ into a _pull-request_.

GitHub does not provide a way to do that through the UI, but that's documented on APIs. GitHub's [official CLI](https://github.com/github/hub) does support it.

There is a script to facilitate this process: `yarn pull-request`. This will guide you to create a pull-request, or turn an issue into one.

#### _Rebase and merge_

We use _Rebase and merge_ strategy for pull-requests. It's important, though, that every branch becomes up-to-date with the `master` history before merging (`git rebase origin/master`).
