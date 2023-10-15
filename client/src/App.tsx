import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { getContact } from './api/getContact';
import { formatNumber } from './helpers/formatNumber';

function App() {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(0);
  const [message, setMessage] = useState('');

  const submitHandler = async () => {
    // так как логика работы подразумевает отправку сразу нескольких запросов...
    // и верным будет только последний, то признак загрузки будем определять таким способом...
    // при отправке плюсуем единичку при получении ответа вычетаем единичку..
    // следовательно когда число 0 все ответы получены
    setIsLoading((prev) => prev + 1);
    const response = await getContact({ number, email });

    if (response.contacts) {
      setMessage(
        response.contacts.reduce(
          (acc, contact) =>
            acc +
            `Email: ${contact.email}\nНомер: ${formatNumber(
              contact.number
            )}\n\n`,
          ''
        )
      );
    }

    if (response.error) {
      setMessage(response.error);
    }

    setIsLoading((prev) => prev - 1);
  };

  return (
    <Container maxWidth="xs" sx={{ p: 1, mt: 5 }}>
      <Stack spacing={3}>
        <TextField
          type="email"
          variant="outlined"
          color="primary"
          label="Email"
          placeholder="email@test.com"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          fullWidth
        />
        <TextField
          type="tel"
          variant="outlined"
          color="primary"
          label="Номер"
          onChange={(event) => setNumber(event.target.value)}
          value={formatNumber(number)}
          placeholder="23-45-56"
          fullWidth
        />
        <Button
          onClick={submitHandler}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Найти контакт
        </Button>
        <Box
          sx={{
            pt: 5,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ m: 'auto' }} />
          ) : (
            <Typography sx={{ whiteSpace: 'pre-line', width: '100%' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
