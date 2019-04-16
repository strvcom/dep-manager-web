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

**Run locally**

```sh
yarn start
```

## Environment Variables

You can define these variables either by prefixing any command, or by setting a [`.env`](https://github.com/motdotla/dotenv) file.

| Variable             | Used for                             | Where to find                                                                 | Target        |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------------- | ------------- |
| `NETLIFY_SITE_ID`    | Authenticate using netlify           | `https://app.netlify.com/sites/[site-name]/settings/general#site-information` | `production`  |
| `ENGINE_API_KEY`     | Tracking query execution performance | `https://engine.apollographql.com/service/[service name]/settings`            | `development` |
| `GITHUB_OAUTH_TOKEN` | Running isolated API locally         | `https://github.com/settings/tokens`                                          | `development` |

## Version control

### Branch

1. All new branchs must start from `master` branch;
2. Every branch refers to an existing issue on GitHub;
3. Each new feature or bug fix must be developet in it's own branch;
4. Branches must follow these naming conventions:

    **Feature/Bug**: `issue/[issue]--[short-description]`

    > Used for developing any planned task.

    ~~**Hotfix**: `hotfix/[issue]--[short-description]`~~

    > ~~Used for developing unplanned production bug fixes.~~

    _This will only be used once we have a production version of the application. Before that, bugs should be addressed as common issues._

### Commit

Always use [Semantic Commits](https://seesparkbox.com/foundry/semantic_commit_messages) messages. This ensures automated changelog and clarity on git history.

### Integration

Every branch should eventually generate a pull-request against the `master`. 

> _We do not use `dev`. Each pull-request is deployed on it's self contained [deploy preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/)_

#### _Squash and merge_

We use _Squash and merge_ strategy for pull-requests. It's important, though, that every branch becomes up-to-date with the `master` history before merging (`git rebase origin/master`).