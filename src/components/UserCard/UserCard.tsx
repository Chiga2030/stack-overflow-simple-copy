import { Card, CardContent, Chip, Paper, Stack, Typography, } from '@mui/material'


interface UserCardProps {
  userName: string,
  questionTheme: string,
  tags?: string[],
  body: string,
}

const UserCard = ({
  userName,
  questionTheme,
  tags,
  body,
}: UserCardProps): JSX.Element => (
  <Card sx={ {
    minWidth: 600,
    width: 'min-content',
  } }>
    <CardContent>
      <Typography variant='h5' component='div'>
        Имя автора: { userName }
      </Typography>


      <Typography variant='body2'>
        Тема вопроса: { questionTheme }
      </Typography>


      { tags && (
        <>
          <Typography sx={ { fontSize: 14, } } color='text.secondary' gutterBottom>
            Тэги:
          </Typography>

          <Stack direction='row' spacing={ 1 }>
            { tags.map((tag, index) => (
              <Chip key={ index } label={ tag } color='success' />
            )) }
          </Stack>
        </>
      ) }


      <Typography variant='body2'>
        Текст вопроса: { questionTheme }
      </Typography>
      <Paper
        sx={ {
          padding: 1,
          width: 'auto',
        } }
        elevation={ 3 }
        dangerouslySetInnerHTML={ { __html: body, } }
      />
    </CardContent>
  </Card>
)


export default UserCard
