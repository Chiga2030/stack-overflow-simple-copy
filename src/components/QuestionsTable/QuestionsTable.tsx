import React, { useMemo, } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import EnhancedTableHead from './components/EnhancedTableHead/EnhancedTableHead'
import Body from './components/Body/Body'
import { useDispatch, } from 'react-redux'
import { Data, Order, setTableOrder, setTablePage, setTableRowsPerPage, } from '../../store/slices/searchSlice'
import { useAppSelector, } from '../../store/hooks'


const createData = (
  name: string,
  theme: string,
  count: number,
  tags: string
): Data => ({
  name,
  theme,
  count,
  tags,
})


const rowsPerPageOptions = [
  5,
  10,
  25,
]

const QuestionsTable = (): JSX.Element => {
  const dispatch = useDispatch()
  const page = useAppSelector(state => state.search.resultSearchTable.page)
  const order = useAppSelector(state => state.search.resultSearchTable.order)
  const rowsPerPage = useAppSelector(state => state.search.resultSearchTable.rowsPerPage)
  const searchResults = useAppSelector(state => state.search.searchResults)
  const setPage = (newPage: number) => dispatch(setTablePage(newPage))
  const setOrder = (newOrder: Order) => dispatch(setTableOrder(newOrder))
  const setRowsPerPage = (newRowsPerPage: number) => dispatch(setTableRowsPerPage(newRowsPerPage))


  const rows = useMemo(() => {
    if (searchResults) {
      return searchResults?.map(result => createData(
        result.owner.display_name,
        result.title,
        result.answer_count,
        result.tags.join(', ')
      ))
    } return null
  }, [
    searchResults,
  ])


  const [
    orderBy,
    setOrderBy,
  ] = React.useState<keyof Data>('name')

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }


  return (
    <Box sx={ { width: '100%', } }>
      <Paper sx={ {
        width: '100%',
        mb: 2,
      } }>
        <TableContainer>
          <Table
            sx={ { minWidth: 750, } }
            aria-labelledby='tableTitle'
            size={ 'medium' }
          >
            <EnhancedTableHead
              orderBy={ orderBy }
              onRequestSort={ handleRequestSort }
              rowCount={ rows?.length || 0 }
            />

            { rows && (
              <Body
                rows={ rows }
                orderBy={ orderBy }
              />
            ) }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ rowsPerPageOptions }
          component='div'
          count={ rows?.length || 0 }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onPageChange={ handleChangePage }
          onRowsPerPageChange={ handleChangeRowsPerPage }
        />
      </Paper>
    </Box>
  )
}


export default QuestionsTable
