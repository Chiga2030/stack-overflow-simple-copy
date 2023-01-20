import axios from 'axios'
import { apiUrl, API_KEY, } from '../../constants'
import { searchUrl, } from '../search-api'

const searchByQuestion = (question: string) => axios.get(`${ apiUrl }${ searchUrl }`, {
  params: {
    key: API_KEY,
    order: 'desc',
    sort: 'activity',
    'q': question,
    filter: 'withbody',
    site: 'stackoverflow',
  },
})
  .then(response => response)
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(error)
  })


export default searchByQuestion
