import { TextField, } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import { Box, } from '@mui/system'
import { useAppDispatch, useAppSelector, } from '../store/hooks'
import { fetchSearchByQuestion, setSearchInput, } from '../store/slices/searchSlice'
import QuestionsTable from '../components/QuestionsTable/QuestionsTable'


const Main = (): JSX.Element => {
  const searchInput = useAppSelector(store => store.search.searchInput)
  const isSearchResultLoading = useAppSelector(store => store.search.isSearchResultLoading)
  const dispatch = useAppDispatch()


  return (
    <>
      <Box
        component='form'
        sx={ {
          '& .MuiTextField-root': {
            margin: 1,
            width: '25ch',
          },
          '& .MuiButton-root': {
            margin: 1,
            width: '25ch',
          },
        } }
        noValidate
        autoComplete='off'
      >
        <TextField
          onChange={ event => dispatch(setSearchInput(event.target.value)) }
          label='Поиск по вопросам'
          type='search'
        />

        <LoadingButton
          type='submit'
          variant='contained'
          disabled={ !searchInput }
          onClick={ () => dispatch(fetchSearchByQuestion(searchInput)) }
          loading={ isSearchResultLoading }
        >
          Искать
        </LoadingButton>
      </Box>


      <QuestionsTable />
    </>
  )
}


export default Main
