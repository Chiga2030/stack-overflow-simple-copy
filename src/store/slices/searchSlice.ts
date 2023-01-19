import { createAsyncThunk, createSlice, PayloadAction, } from '@reduxjs/toolkit'
import searchApi from '../../api/search-api'
import { AxiosResponse, } from 'axios'


export const fetchSearchByQuestion = createAsyncThunk(
  'search/fetchSearchByQuestion',
  async (searchInput: string) => {
    const { data, } = await searchApi.searchByQuestion(searchInput) as AxiosResponse

    return data
  }
)


export interface SearchState {
  searchInput: string,
  isSearchResultLoading: boolean,
}


const initialState: SearchState = {
  searchInput: '',
  isSearchResultLoading: false,
}


export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload
    },
  },

  extraReducers (builder) {
    builder.addCase(fetchSearchByQuestion.pending, state => {
      state.isSearchResultLoading = true
    })
    builder.addCase(fetchSearchByQuestion.fulfilled, (state, action) => {
      console.log('RESULT INTO REDUCER', action.payload)
      state.isSearchResultLoading = false
    })
  },
})


export const { setSearchInput, } = searchSlice.actions
export default searchSlice.reducer
