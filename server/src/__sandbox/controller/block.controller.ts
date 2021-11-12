import { Request, Response } from 'express';
import log from '../../logger';
import {
   blockDetailsByHash,
   createBlock,
   createBlockDetails,
   getBlockDetails,
   getBlocks,
} from '../../service/block.service';
import { get } from 'lodash';

export async function createBlockHandler(req: Request, res: Response) {
   try {
      const block = await createBlock(req.body);
      return res.send(block);
   } catch (e) {
      log.error(e);
      return res.status(409).send(e.message);
   }
}

export async function createBlockDetailsHandler(req: Request, res: Response) {
   try {
      const block = await createBlockDetails(req.body, req.params);
      return res.send(block);
   } catch (e) {
      log.error(e);
      return res.status(409).send(e.message);
   }
}

export async function getPostDetailsHandler(req: Request, res: Response) {
   const hash = get(req, 'params.hash');

   try {
      // const block = await getBlockDetails(hash)
      const block = await blockDetailsByHash(hash);
      return res.send(block);
   } catch (e) {
      log.error(e);
      return res.status(409).send(e.message);
   }
}

export async function getBlocksHandler(req: Request, res: Response) {
   try {
      const blocks = await getBlocks();
      return res.send(blocks);
   } catch (e) {
      log.error(e);
      return res.status(409).send(e.message);
   }
}
