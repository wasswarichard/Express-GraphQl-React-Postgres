import { gql } from '@apollo/client';

const BLOCK_DETAILS = gql`
   query getBlockDetails($hash: String!) {
      blockDetails(hash: $hash) {
         hash
         height
         time
         prev_block
         weight
         size
      }
   }
`;

export default BLOCK_DETAILS;
