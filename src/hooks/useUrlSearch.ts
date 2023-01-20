import { useLocation, } from 'react-router-dom'


const useUrlSearch = (param: string) => {
  const { search, } = useLocation()
  const result = new URLSearchParams(search).get(param)

  return result || ''
}


export default useUrlSearch
