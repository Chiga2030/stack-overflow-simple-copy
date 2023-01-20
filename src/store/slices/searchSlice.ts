import { createAsyncThunk, createSlice, PayloadAction, } from '@reduxjs/toolkit'
import searchApi from '../../api/search-api/search-api'
import { AxiosResponse, } from 'axios'


export const fetchSearchByQuestion = createAsyncThunk(
  'search/fetchSearchByQuestion',
  async (searchInput: string) => {
    const { data, } = await searchApi.searchByQuestion(searchInput) as AxiosResponse

    return data
  }
)


export interface Data {
  theme: string;
  count: number;
  tags: string;
  name: string;
}

export type Order = 'asc' | 'desc';

interface SearchQestionResult {
  owner: {
    display_name: string,
    user_id: number,
  },
  title: string,
  answer_count: number,
  tags: string[],
  question_id: number,
}

export interface SearchState {
  searchInput: string,
  isSearchResultLoading: boolean,
  searchResults: SearchQestionResult[] | null,
  resultSearchTable: {
    page: number,
    order: Order,
    rowsPerPage: number,
    orderBy: keyof Data,
  }
}


const initialState: SearchState = {
  searchInput: '',
  isSearchResultLoading: false,
  searchResults: null,
  resultSearchTable: {
    page: 0,
    order: 'asc',
    rowsPerPage: 5,
    orderBy: 'name',
  },
}


export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload
    },

    setTablePage: (state, action: PayloadAction<number>) => {
      state.resultSearchTable.page = action.payload
    },
    setTableRowsPerPage: (state, action: PayloadAction<number>) => {
      state.resultSearchTable.rowsPerPage = action.payload
    },
    setTableOrder: (state, action: PayloadAction<Order>) => {
      state.resultSearchTable.order = action.payload
    },
  },

  extraReducers (builder) {
    builder.addCase(fetchSearchByQuestion.pending, state => {
      state.isSearchResultLoading = true
    })
    builder.addCase(fetchSearchByQuestion.fulfilled, (state, action) => {
      state.isSearchResultLoading = false
      state.searchResults = action.payload.items
    })
  },
})


export const { setSearchInput, setTablePage, setTableOrder, setTableRowsPerPage, } = searchSlice.actions
export default searchSlice.reducer
