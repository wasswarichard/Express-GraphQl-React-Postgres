import _ from 'underscore';

const transaction = (details: any) => {
   return _.pick(details, 'prev_block', 'hash', 'next_block', 'size', 'weight');
};

const transactionBlocks = (blocks: any) => {
   return blocks?.map((block: any) => {
      if (block.time) {
         const previousTime = block.time;
         const formattedTime = new Date();
         formattedTime.setTime(parseInt(previousTime));
         return {
            ...block,
            time: formattedTime.toUTCString(),
         };
      } else return block;
   });
};

export const transactionService = { transaction, transactionBlocks };
