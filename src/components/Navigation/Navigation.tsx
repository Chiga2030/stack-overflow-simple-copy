import { Box, } from '@mui/system'
import { Link, } from 'react-router-dom'
import { Routes, } from '../../App'

const Navigation = (): JSX.Element => (
  <Box
    sx={ {
      typography: 'body1',
      '& > :not(style) + :not(style)': {
        ml: 2,
      },
      mb: 3,
    } }
  >
    <Link to={ Routes.MAIN } >
      На главную страницу
    </Link>
  </Box>
)


export default Navigation
