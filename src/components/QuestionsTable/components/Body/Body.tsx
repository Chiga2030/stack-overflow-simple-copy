import { TableBody, TableCell, TableRow, } from '@mui/material'
import { Link, } from 'react-router-dom'
import { Routes, } from '../../../../App'
import { useAppSelector, } from '../../../../store/hooks'
import { Data, } from '../../../../store/slices/searchSlice'
import getComparator from './getComparator'
import stableSort from './stableSort'


interface BodyProps {
  rows: Data[],
  orderBy: keyof Data,
}


const UserLink = ({ questionId, }: { questionId: number | undefined }): JSX.Element => (
  <Link to={ `${ Routes.QUESTION_DETAILS }?questionId=${ questionId }` } >
    К вопросу:
  </Link>
)


const Body = ({
  rows,
  orderBy,
}: BodyProps): JSX.Element => {
  const page = useAppSelector(state => state.search.resultSearchTable.page)
  const order = useAppSelector(state => state.search.resultSearchTable.order)
  const rowsPerPage = useAppSelector(state => state.search.resultSearchTable.rowsPerPage)
  const searchResults = useAppSelector(state => state.search.searchResults)


  const emptyRows = page > 0 ? (Math.max(0, (1 + page) * rowsPerPage) - rows.length) : 0


  return (
    <TableBody>
      { stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
        .map(row => (
          <TableRow
            hover
            role='checkbox'
            tabIndex={ -1 }
            key={ row.name }
          >
            <TableCell align='center' colSpan={ 3 }>
              <UserLink questionId={ searchResults?.find(result => result.title === row.theme)?.question_id } />
            </TableCell>

            <TableCell
              component='th'
              scope='row'
              padding='none'
            >
              { row.name }
            </TableCell>
            <TableCell align='right'>{ row.theme }</TableCell>
            <TableCell align='right'>{ row.count }</TableCell>
            <TableCell align='right'>{ row.tags }</TableCell>
          </TableRow>
        )) }


      { emptyRows > 0 && (
        <TableRow
          style={ {
            height: 33 * emptyRows,
          } }
        >
          <TableCell colSpan={ 6 } />
        </TableRow>
      ) }
    </TableBody>
  )
}


export default Body
