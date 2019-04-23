import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text } from '@storybook/addon-knobs'
import 'react-virtualized/styles.css'

import { n, chance } from '../../tests/utils/mocking'
import { BidaDepartment } from '../../config/types'

import NodeLibraryDependentsTable from './'

storiesOf('NodeLibraryDependentsTable', module)
  .add('empty', () => (
    <NodeLibraryDependentsTable
      department={BidaDepartment.FRONTEND}
      dependents={[]}
      libraryVersion='5.0.0'
    />
  ))
  .add('filled', () => {
    const amount = Math.max(0, number('Projects', 10))
    const version = text('Version', '5.20.7')
    const dependents: any = n(amount, () =>
      chance.dependent({ maxVersion: version })
    )

    return (
      <NodeLibraryDependentsTable
        cacheKey={chance.string()}
        department={BidaDepartment.FRONTEND}
        dependents={dependents}
        libraryVersion={version}
      />
    )
  })
