import React from 'react'
import { useLibraries } from '../../data/Library'
import Table, { Column, TableCellProps } from '../../components/Table'
import StatusColumn from './StatusColumn'
import { Department } from '../../config/types'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import semverDiff from 'semver-diff'
import semverRegex from 'semver-regex'

export interface LibrariesTableProps {
  department: Department
  onRowClick?: (project: Repositories_nodes) => void
}

export const LibrariesTable = React.memo<LibrariesTableProps>(props => {
  const { errors, data: libraries } = useLibraries(props.department)
  if (errors) return null
  if (!libraries) return null
  const handleTotalRender = React.useCallback(
    ({ rowData }: TableCellProps<'dependents', NodeLibrary>) =>
      rowData.dependents.length,
    [libraries]
  )
  const handleOutdatedRender = React.useCallback(
    ({ rowData }: TableCellProps<'dependents', NodeLibrary>) => {
      const statusColumnProps = rowData.dependents.reduce(
        (acc, dependent) => {
          const libraryVersion = semverRegex().exec(rowData.version)![0]
          const dependentVersion = semverRegex().exec(dependent.version)![0]
          const diff = semverDiff(dependentVersion, libraryVersion)
          if (diff === 'major') acc.outDated++
          else if (diff === 'minor') acc.alerts++
          return acc
        },
        { outDated: 0, alerts: 0 }
      )
      return <StatusColumn {...statusColumnProps} />
    },
    [libraries]
  )
  return (
    <Table
      rowCount={libraries.length}
      rowGetter={({ index }) => libraries[index]}
      // onRowClick={props.onRowClick && handleRowClick}
    >
      <Column width={380} label='Library Name' dataKey='name' />
      <Column
        width={380}
        label='Total Used On'
        dataKey='dependents'
        cellRenderer={handleTotalRender}
      />
      <Column
        width={380}
        label='Outdated'
        dataKey='dependents'
        cellRenderer={handleOutdatedRender}
      />
    </Table>
  )
})
