---
title: Stacks & Whys
description: Explain project's used technology and reasoning behind it
---

# Stack & Whys

## Built with

This is a [create-react-app](https://github.com/facebook/create-react-app) scafolded application, served through [netlify](https://www.netlify.com/) and authenticated with [GitHub's provider](https://www.netlify.com/docs/authentication-providers/) that fetches repository data using [GitHub GraphQL API v4](https://developer.github.com/v4/) and NPM package info from [npms analyzer](https://api-docs.npms.io/) proxied through a custom GraphQL API made on top of [Apollo Server](https://www.apollographql.com/docs/apollo-server/deployment/lambda) running on a [netlify lambda function](https://www.netlify.com/docs/functions/).

## Decisions

### Why netlify

1. Continuous deployment out of the box;
2. Immutable deploys (each deploy/branch/pull-request has it's own URL);
3. GitHub OAuth with no dedicated server.
4. Easy mono-repo lambdas.

### Why GraphQL

This app made of highly relational data that dependent on multiple sources. By leverage from GraphQL's [schema stiching][] and [schema transformation][] techniques, we can easily build an API robust and flexible enough to be capable of resolving all necessary data in a single request.

[schema stiching]: https://www.apollographql.com/docs/graphql-tools/schema-stitching
[schema transformation]: https://www.apollographql.com/docs/graphql-tools/schema-transforms

### Why Apollo

Apollo is the most advanced GraphQL ecosystem so far, and is backed by a long-time and respected [open-source company][meteor].

> Read more about why Apollo on _[this article][why apollo]_

[meteor]: https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives/ 'Meteor'
[why apollo]: https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives/ 'Why Apollo: Advantages, Disadvantages & Alternatives'

### Why [npms](https://npms.io/)

It has a public API. npm does not.
