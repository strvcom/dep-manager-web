import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import 'react-virtualized/styles.css'
import { n, chance } from '../../tests/utils/mocking'

import NodeProjectsTable from './'

storiesOf('Tables/NodeProjectsTable', module)
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
