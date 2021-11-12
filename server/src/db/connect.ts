import log from '../logger';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { BlockDetails } from '../models/BlockDetails';
import { Blocks } from '../models/Blocks';

const connect = async () => {
   dotenv.config();
   const { DB_TYPE, PG_DATABASE, PG_PASSWORD, PG_USER, PG_HOST, PG_PORT } =
      process.env;

   try {
      // @ts-ignore
      await createConnection({
         type: DB_TYPE,
         host: PG_HOST,
         port: PG_PORT,
         username: PG_USER,
         password: PG_PASSWORD,
         database: PG_DATABASE,
         entities: [BlockDetails, Blocks],
         synchronize: true,
      });
      log.info(`Connected to ${PG_DATABASE} ${DB_TYPE} Database`);
   } catch (error) {
      console.log(`${error} on ${PG_DATABASE} database`);
      log.error('db error', error);
   }
};

export default connect;
