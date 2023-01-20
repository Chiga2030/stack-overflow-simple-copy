import { Order, } from '../../../../store/slices/searchSlice'


function descendingComparator<T> (paramA: T, paramB: T, orderBy: keyof T) {
  if (paramB[orderBy] < paramA[orderBy]) {
    return -1
  }
  if (paramB[orderBy] > paramA[orderBy]) {
    return 1
  }
  return 0
}


function getComparator<Key extends keyof any> (
  order: Order,
  orderBy: Key
): (
  paramA: { [key in Key]: number | string },
  paramB: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (paramA, paramB) => descendingComparator(paramA, paramB, orderBy)
    : (paramA, paramB) => -descendingComparator(paramA, paramB, orderBy)
}


export default getComparator
