import React from 'react'
import Table, { Column, Index } from '../components/Table/index'
import gql from 'graphql-tag'
import { LibrariesTableItem } from './__generated-types/LibrariesTableItem'
// import { isValidLicense } from '../../data/Library/index'

gql`
  fragment LibrariesTableItem on BidaLibrary {
    name
  }
`

export interface LibrariesTableProps {
  libraries: LibrariesTableItem[]
}

const LibrariesTable = React.memo<LibrariesTableProps>(({ libraries }) => {
  const rowGetter = React.useCallback(({ index }: Index) => libraries[index], [
    libraries
  ])
  return (
    <Table rowCount={libraries.length} rowGetter={rowGetter}>
      <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />
    </Table>
  )
})

export default LibrariesTable
