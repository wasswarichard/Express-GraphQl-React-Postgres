import { latestBlocks } from './latestBlocks';
import { blockDetails } from "./blockDetails";

const resolvers = {
   Query: {
      latestBlocks,
      blockDetails
      // blockDetails: async (_: any, args: any) => {
      //    const { hash } = args;
      //    return await blockDetails(hash);
      // },
   },
};

export { resolvers };
