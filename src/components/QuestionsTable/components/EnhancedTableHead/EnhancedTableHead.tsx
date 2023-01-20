import { TableCell, TableHead, TableRow, TableSortLabel, } from '@mui/material'
import { Box, } from '@mui/system'
import { visuallyHidden, } from '@mui/utils'
import { useAppSelector, } from '../../../../store/hooks'
import { Data, } from '../../../../store/slices/searchSlice'

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Автор вопроса',
  },
  {
    id: 'theme',
    numeric: true,
    disablePadding: false,
    label: 'Тема',
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: 'Количество ответов',
  },
  {
    id: 'tags',
    numeric: true,
    disablePadding: false,
    label: 'Теги',
  },
]

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const order = useAppSelector(state => state.search.resultSearchTable.order)

  const { orderBy, onRequestSort, } =
    props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell align='center' colSpan={ 3 }>
          Ссылка на вопрос
        </TableCell>
        { headCells.map(headCell => (
          <TableCell
            key={ headCell.id }
            align={ headCell.numeric ? 'right' : 'left' }
            padding={ headCell.disablePadding ? 'none' : 'normal' }
            sortDirection={ orderBy === headCell.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : 'asc' }
              onClick={ createSortHandler(headCell.id) }
            >
              { headCell.label }

              { orderBy === headCell.id ? (
                <Box component='span' sx={ visuallyHidden }>
                  { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                </Box>
              ) : null }
            </TableSortLabel>
          </TableCell>
        )) }
      </TableRow>
    </TableHead>
  )
}


export default EnhancedTableHead
