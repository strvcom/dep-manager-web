import React from 'react'
import Chance from 'chance'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import 'react-virtualized/styles.css'

import NodeProjectsTable from './'

const n = (amount: number, fn: any) => new Array(amount).fill(null).map(fn)

const chance = new Chance()

const OUTDATE_STATUS = [
  'MAJOR',
  'PREMAJOR',
  'MINOR',
  'PREMINOR',
  'PATCH',
  'PREPATCH',
  'PRERELEASE',
  'UNKNOWN',
  'UPTODATE'
]

chance.mixin({
  dependency: () => ({
    outdateStatus: chance.pickone(OUTDATE_STATUS)
  })
})

chance.mixin({
  project: () => ({
    name: chance.word(),
    pushedAt: chance.date().toString(),
    npmPackage: {
      dependencies: n(10, chance.dependency)
    }
  })
})

storiesOf('NodeProjectsTable', module)
  .add('empty', () => <NodeProjectsTable projects={[]} department='frontend' />)
  .add('filled', () => {
    const amount = Math.max(0, number('Projects', 10))
    const projects: any = n(amount, chance.project)

    return (
      <NodeProjectsTable
        cacheKey={chance.string()}
        projects={projects}
        department='frontend'
      />
    )
  })
