import express from 'express';
import corsMiddleware from './middleware/cors';
import { getErrorMessage } from './helpers/getErrorMessage';
import path from 'path';

import contactsRouter from './routes/contacts.routes';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/v1/contacts/', contactsRouter);

app.use('/', express.static(path.join(__dirname, '../../client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
});

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port --> ${PORT}...`)
    );
  } catch (e) {
    console.log('server Error :-(', getErrorMessage(e));
    process.exit(1);
  }
}

start();
