import { Typography, } from '@mui/material'
import { AnswerInfo, } from '../../store/slices/questionsSlice'
import UserCard from '../UserCard/UserCard'


interface AnswersProps {
  answers: AnswerInfo[],
}


const Answers = ({
  answers,
}: AnswersProps) => (
  <>
    <Typography variant='h3' component='div'>
      Ответы:
    </Typography>

    { answers.length < 1 && 'Ответов пока нет' }

    { answers.map(answer => (
      <UserCard
        key={ answer.answer_id }
        userName={ answer.owner.display_name }
        questionTheme={ answer.title }
        body={ answer.body }
      />
    )) }
  </>
)

export default Answers
