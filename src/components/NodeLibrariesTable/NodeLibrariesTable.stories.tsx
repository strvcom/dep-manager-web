import React from 'react'
import Chance from 'chance'
import { prop } from 'ramda'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import 'react-virtualized/styles.css'

import NodeLibrariesTable from './'

const chance = new Chance()

chance.mixin({
  package: (name: string) => ({
    name: name || chance.word(),
    license: chance.pickone(['MIT', 'Apache', 'GPLv3', 'UNLICENSED'])
  })
})

chance.mixin({
  library: (...args: any[]) => ({
    package: chance.package(...args)
  })
})

storiesOf('NodeLibrariesTable', module)
  .add('empty', () => (
    <NodeLibrariesTable libraries={[]} outdates={{ MAJOR: [], MINOR: [] }} />
  ))
  .add('filled', () => {
    const libs = Math.max(0, number('Libraries', 10))
    const libraries = new Array(libs).fill(null).map(chance.library)
    const outs = { range: true, min: 0, max: libs, step: 1 }

    const outdates = {
      MAJOR: chance
        .pickset(libraries, Math.min(libs, 5), outs)
        .map(prop('package')),

      MINOR: chance
        .pickset(libraries, Math.min(libs, 3), outs)
        .map(prop('package')),

      UPTODATE: chance
        .pickset(libraries, Math.min(libs, 2), outs)
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
