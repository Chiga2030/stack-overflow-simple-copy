function stableSort<T> (array: readonly T[], comparator: (paramA: T, paramB: T) => number) {
  const stabilizedThis = array.map((el, index) => [
    el,
    index,
  ] as [T, number])

  stabilizedThis.sort((paramA, paramB) => {
    const order = comparator(paramA[0], paramB[0])
    if (order !== 0) {
      return order
    }
    return paramA[1] - paramB[1]
  })
  return stabilizedThis.map(el => el[0])
}


export default stableSort
