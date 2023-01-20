import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import { AxiosResponse, } from 'axios'
import questionsApi from '../../api/question-api/question-api'


export const fetchInfoByQuestionId = createAsyncThunk(
  'questions/fetchInfoByQuestionId',
  async (questionId: string) => {
    const { data, } = await questionsApi.getInfoByQuestionId(questionId) as AxiosResponse

    return data
  }
)

export const fetchAnswersByQuestionId = createAsyncThunk(
  'questions/fetchAnswersByQuestionId',
  async (questionId: string) => {
    const { data, } = await questionsApi.getAnswersByQuestionId(questionId) as AxiosResponse

    return data
  }
)


export interface QuestionInfo {
  answer_count: number,
  is_answered: boolean,
  tags: string[],
  title: string,
  view_count: string,
  body: string,
  owner: {
    display_name: string,
  }
}

export interface AnswerInfo {
  answer_count: number,
  answer_id: number,
  is_answered: boolean,
  title: string,
  view_count: string,
  body: string,
  owner: {
    display_name: string,
  }
}


export interface QuestionsState {
  isQuestionsInfoLoading: boolean,
  isAnswersLoading: boolean,
  questionInfo: QuestionInfo | null,
  answers: AnswerInfo[] | null,
}


const initialState: QuestionsState = {
  isQuestionsInfoLoading: false,
  isAnswersLoading: false,
  questionInfo: null,
  answers: null,
}


export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    resetQuestions: state => {
      state.questionInfo = null
    },
    resetAnswers: state => {
      state.answers = null
    },
  },

  extraReducers (builder) {
    builder.addCase(fetchInfoByQuestionId.pending, state => {
      state.isQuestionsInfoLoading = true
    })
    builder.addCase(fetchInfoByQuestionId.fulfilled, (state, action) => {
      state.isQuestionsInfoLoading = false
      state.questionInfo = action.payload.items[0]
    })
    builder.addCase(fetchAnswersByQuestionId.pending, state => {
      state.isAnswersLoading = true
    })
    builder.addCase(fetchAnswersByQuestionId.fulfilled, (state, action) => {
      state.isAnswersLoading = false
      state.answers = action.payload.items
    })
  },
})


export const { resetQuestions, resetAnswers, } = questionsSlice.actions
export default questionsSlice.reducer
