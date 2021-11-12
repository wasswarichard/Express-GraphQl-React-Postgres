import { gql } from 'apollo-server-express';

export const typeDefs = gql`
   enum CacheControlScope {
      PUBLIC
      PRIVATE
   }
   directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
   ) on OBJECT | FIELD | FIELD_DEFINITION
   type Block @cacheControl {
      hash: String!
      height: String!
      time: String!
      size: String!
      prev_block: String!
      weight: String!
   }
   type Blocks @cacheControl {
      block_index: String!
      hash: String!
      height: String!
      time: String!
   }
   type Query {
      latestBlocks: [Blocks]!
      blockDetails(hash: String!): Block
   }
`;
