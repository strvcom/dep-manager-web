import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import 'react-virtualized/styles.css'
import { n, chance } from '../../tests/utils/mocking'
import { BidaDepartment } from '../../config/types'

import NodeProjectDependenciesTable from './'

storiesOf('NodeProjectDependenciesTable', module)
  .add('empty', () => (
    <NodeProjectDependenciesTable
      dependencies={[]}
      department={BidaDepartment.FRONTEND}
    />
  ))
  .add('filled', () => {
    const amount = Math.max(0, number('Dependencies', 10))
    const dependencies: any = n(amount, chance.dependency)

    return (
      <NodeProjectDependenciesTable
        cacheKey={chance.string()}
        dependencies={dependencies}
        department={BidaDepartment.FRONTEND}
      />
    )
  })
