import { Express, Request, Response } from 'express';
import { validateRequest } from '../../middleware';
import {
   createBlockDetailsHandler,
   createBlockHandler,
   getBlocksHandler,
   getPostDetailsHandler,
} from '../controller/block.controller';
import {
   createBlockDetailsSchema,
   createBlockSchema,
} from '../../schema/block.schema';

export default function (app: Express) {
   // Test
   app.get('/check', (req: Request, res: Response) => res.sendStatus(200));

   // create blocks
   app.post('/blocks', validateRequest(createBlockSchema), createBlockHandler);

   // create block details
   app.post(
      '/block/:hash',
      validateRequest(createBlockDetailsSchema),
      createBlockDetailsHandler
   );

   // Get blocks
   app.get('/blocks', getBlocksHandler);

   // Get block details
   app.get('/block/:hash', getPostDetailsHandler);
}
