# Roadmap

All right! now that this repo is up to date is time to carry on!.

[NUMBER ONE PRIORITY](#github-topics)

## Features

1. Add search functionality on tables (#8)
2. Add sorting row functionality on tables (#9)
3. Add filter functionality on tables (#10)

## Tech Debts

### Async Initializers

Recently there were some updates in the `apollo-client` echosystem. mostly fixing some minor bugs and etc, apparently now `apollo-client` accepts async initializers, as long as they're not introduced in the default initializer. So executing async initializers is as simple as:

```typescript
client.runInitializers({
  'id:__typename': async () => {/* do async stuff here! */}
})
```

It'd be nice to remove unecessary [temporary solutions](src/utils/apollo-utils.ts) that were made to address this issue.

### Github Topics

The issues #31 and #34 should be the first ones to worry about, both of them address the same problem which is how to differ the different kinds of projects (FRONTEND, BACKEND, ANDROID or IOS) that the application supports. The issue #34 address the [Github Topics](https://help.github.com/articles/about-topics/) as a possible solution for this problem.

### Lazy Loading

The issue #23 refers to lazy loading into the table components which would also be a nice thing to solve before doing new features.

### Empty State

The issue #22 highlights the necessity of creasting empty states for tables, widgets and etc,.
This is something to be designed first!
