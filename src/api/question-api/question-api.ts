import getInfoByQuestionId from './queries/getInfoByQuestionId'
import getAnswersByQuestionId from './queries/getAnswersByQuestionId'

export const questionsUrl = 'questions/'


const questionsApi = {
  getInfoByQuestionId,
  getAnswersByQuestionId,
}


export default questionsApi
