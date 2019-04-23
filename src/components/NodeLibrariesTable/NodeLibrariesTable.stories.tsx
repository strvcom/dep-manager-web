import React from 'react'
import { prop } from 'ramda'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import 'react-virtualized/styles.css'
import { n, chance } from '../../tests/utils/mocking'

import NodeLibrariesTable from './'

storiesOf('Tables/NodeLibrariesTable', module)
  .add('empty', () => (
    <NodeLibrariesTable libraries={[]} outdates={{ MAJOR: [], MINOR: [] }} />
  ))
  .add('filled', () => {
    const amount = Math.max(0, number('Libraries', 10))

    const libraries = n(amount, chance.library)
    const outs = { range: true, min: 0, max: amount, step: 1 }

    const outdates = {
      MAJOR: chance
        .pickset(libraries, Math.min(amount, 5), outs)
        .map(prop('package')),

      MINOR: chance
        .pickset(libraries, Math.min(amount, 3), outs)
        .map(prop('package')),

      UPTODATE: chance
        .pickset(libraries, Math.min(amount, 2), outs)
        .map(prop('package'))
    }

    return (
      <NodeLibrariesTable
        cacheKey={chance.string()}
        libraries={libraries}
        outdates={outdates}
      />
    )
  })
