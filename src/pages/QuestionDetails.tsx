import { CircularProgress, } from '@mui/material'
import { useEffect, } from 'react'
import Answers from '../components/Answers/Answers'
import UserCard from '../components/UserCard/UserCard'
import useUrlSearch from '../hooks/useUrlSearch'
import { useAppDispatch, useAppSelector, } from '../store/hooks'
import { fetchAnswersByQuestionId, fetchInfoByQuestionId, resetAnswers, resetQuestions, } from '../store/slices/questionsSlice'

const QuestionDetails = (): JSX.Element => {
  const questionId = useUrlSearch('questionId')
  const dispatch = useAppDispatch()
  const questionInfo = useAppSelector(state => state.questions.questionInfo)
  const answers = useAppSelector(state => state.questions.answers)


  useEffect(() => {
    dispatch(fetchInfoByQuestionId(questionId))

    return () => {
      dispatch(resetQuestions())
    }
  }, [
    dispatch,
    questionId,
  ])


  useEffect(() => {
    dispatch(fetchAnswersByQuestionId(questionId))

    return () => {
      dispatch(resetAnswers())
    }
  }, [
    dispatch,
    questionId,
  ])


  return (
    <>
      { questionInfo ? (
        <>
          <UserCard
            userName={ questionInfo.owner.display_name }
            questionTheme={ questionInfo.title }
            tags={ questionInfo.tags }
            body={ questionInfo.body }
          />

          <br /><br />

          { answers ? (<Answers answers={ answers } />) : <CircularProgress /> }

        </>
      ) : (<CircularProgress />)
      }
    </>
  )
}


export default QuestionDetails
