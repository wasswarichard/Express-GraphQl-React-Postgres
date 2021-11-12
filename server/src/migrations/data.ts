import {
   blockDetailsByHash,
   blocksData,
   createBlock,
} from '../service/block.service';

export const createBlocksData = async () => {
   const blockData = await blocksData();
   blockData.forEach((block: any) => {
      createBlock(block);
   });
   return blockData;
};

export const createBlockDetailsData = async () => {
   const hash: string[] = [];
   const blockData = await blocksData();
   await blockData.forEach((block: any) => hash.push(block.hash));

   let blockDetailsData: any[] = [];
   await hash.forEach((id: string) => {
      const blockDetail: any = blockDetailsByHash(id);
      if (blockDetail) {
         const { block_index, prev_block, size, hash } = blockDetail;
         blockDetailsData.push({ block_index, prev_block, size, hash });
      }
   });
   console.log(blockDetailsData);
};
