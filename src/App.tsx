import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import MainContainer from './components/MainContainer/MainContainer'
import Main from './pages/Main'
import QuestionDetails from './pages/QuestionDetails'


export const enum Routes {
  MAIN = '/',
  QUESTION_DETAILS = '/questionDetails',
}


const router = createBrowserRouter([
  {
    path: Routes.MAIN,
    element: <MainContainer><Main /></MainContainer>,
  },
  {
    path: Routes.QUESTION_DETAILS,
    element: <MainContainer><QuestionDetails /></MainContainer>,
  },
])


const App = () => (
  <RouterProvider router={ router } />
)


export default App
