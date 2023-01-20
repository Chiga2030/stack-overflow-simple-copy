import { configureStore, } from '@reduxjs/toolkit'
import questionsSlice from './slices/questionsSlice'
import searchReducer from './slices/searchSlice'


export const store = configureStore({
  reducer: {
    search: searchReducer,
    questions: questionsSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
