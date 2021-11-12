import { gql } from '@apollo/client';

const LATEST_BLOCKS = gql`
   query latestBlocks {
      latestBlocks {
         block_index
         hash
         height
         time
      }
   }
`;

export default LATEST_BLOCKS;
