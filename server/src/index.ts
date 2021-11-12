import { app } from './app';
import dotenv from 'dotenv';
import log from './logger';
dotenv.config();
const port = process.env.API_PORT;

app.listen(port, () => {
   log.info(`Server listening at port ${port}`);
});
