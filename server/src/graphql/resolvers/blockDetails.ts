import {blockDetailsByHash} from '../../service/block.service';

export const blockDetails = async (_: any, args: any) => {
   const { hash } = args;
   return await blockDetailsByHash(hash);
};
