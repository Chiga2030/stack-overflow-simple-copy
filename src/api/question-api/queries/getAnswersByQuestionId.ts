import axios from 'axios'
import { apiUrl, API_KEY, } from '../../constants'
import { questionsUrl, } from '../question-api'


const getAnswersByQuestionId = (questionId: string) => axios.get(`${ apiUrl }${ questionsUrl }${ questionId }/answers`, {
  params: {
    key: API_KEY,
    order: 'desc',
    sort: 'activity',
    site: 'stackoverflow',
    filter: 'withbody',
  },
})
  .then(response => response)
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(error)
  })


export default getAnswersByQuestionId
