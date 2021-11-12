import { getBlocks } from '../../service/block.service';

export const latestBlocks = async () => {
   return await getBlocks();
};
