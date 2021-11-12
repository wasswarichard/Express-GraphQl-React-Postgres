import { Blocks } from '../models/Blocks';
import { BlockDetails } from '../models/BlockDetails';
import { createQueryBuilder } from 'typeorm';
import axios from 'axios';
import { createBlocksData } from '../migrations/data';
import dotenv from 'dotenv';
dotenv.config();

const externalApi = 'https://blockchain.info';

export async function createBlock(input: any) {
   const { block_index, hash, height, time } = input;

   try {
      const block = Blocks.create({ block_index, hash, height, time });
      await block.save();
      return block;
   } catch (error) {
      throw new Error(error);
   }
}

export async function createBlockDetails(body: any, params: any) {
   const { block_index, prev_block, size } = body;
   const { hash } = params;

   const block = Blocks.findOne(hash);

   if (!block) {
      return {
         message: 'hash record not found',
      };
   }

   try {
      const details = BlockDetails.create({
         block_index,
         prev_block,
         size,
         hash,
      });
      return await details.save();
   } catch (error) {
      throw new Error(error);
   }
}

export async function getBlocks() {
   try {
      const blocks = await Blocks.find();
      if (blocks.length === 0) {
         await createBlocksData();
         return await Blocks.find();
      }
      return blocks;
   } catch (error) {
      throw new Error(error);
   }
}

export async function getBlockDetails(hash: string) {
   try {
      return await createQueryBuilder('blockDetails')
         .select('blockDetails')
         .from(BlockDetails, 'blockDetails')
         .where('blockDetails.hash_id = :hash', { hash })
         .getOne();
   } catch (error) {
      throw new Error(error);
   }
}

export const blocksData = async () => {
   const { data } = await axios.get(
      `${externalApi}/blocks/${Date.parse('June 26, 2021')}?format=json`
   );
   return data;
};

export const blockDetailsByHash = async (filterHash: string) => {
   const response = await axios.get(`${externalApi}/rawblock/${filterHash}`);
   const {
      hash,
      prev_block,
      time,
      height,
      weight,
      size,
   }: {
      hash: string;
      prev_block: string;
      time: string;
      height: string;
      weight: string;
      size: string;
   } = response.data;
   return { hash, prev_block, time, height, weight, size };
};
