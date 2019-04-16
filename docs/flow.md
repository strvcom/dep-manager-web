---
title: Workflow
description: What to do, from idea into production
---

# Workflow

This document describes the workflow from idea to production. This can evolve over time, so use this document as a reference, not a strict guideline.

## 1. Create issues

Every idea or problem, regardless of priority or feasibility, **MUST** be described into a [new issue][issue].

- Keep titles as short as possible;
- Describe only the necessary.

## 2. Backlog

Once we decide an issue must be solved, we **SHOULD** add it to the [backlog] column of the kanban [board].

Priority on the backlog can be adjusted from time to time by dragging issues to the top of the list.

> It's important that we only add to the backlog issues which are planned for implementation, avoid bloating.

## 3. Ready for dev

When issues are well described and absent of impediments, it **MIGHT** be moved to the [Ready for dev][ready] column. It's importante we don't bloat this column, so issues **SHOULD** only be moved here if there is a near possibility of it being addressed.

## 4. In progress

Every time a developer starts working on an issue, she/he **MUST** move it to the [In progress][progress] column and **MUST** assign it.

> Follow the [development guidelines] for specific development workflow.

## 5. Approval

When an issue is ready for being analized - either by the PO or other members of the team - it **MUST** be moved to the [Approval] column. It's the developer's responsability to inform relevant people for the analysis.

[issue]: https://github.com/strvcom/dep-manager-web/issues/new 'Create a new issue'
[board]: https://github.com/strvcom/dep-manager-web/projects/3 'Kanban board'
[backlog]: https://github.com/strvcom/dep-manager-web/projects/3#column-5052157 'Backlog column'
[ready]: https://github.com/strvcom/dep-manager-web/projects/3#column-5052146 'Ready for dev column'
[progress]: https://github.com/strvcom/dep-manager-web/projects/3#column-5052147 'In progress column'
[approval]: https://github.com/strvcom/dep-manager-web/projects/3#column-5052901 'Approval column'
[done]: https://github.com/strvcom/dep-manager-web/projects/3#column-5052148 'Done column'
[development guidelines]: ./01-development.md

## 6. Done

An issue **MUST** only be moved into the [Done] column once the code is integrated into `master` branch, deployed into the production environment, and thoroughly tested.
