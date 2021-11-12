import express from 'express';
import cors from 'cors';
import connect from './db/connect';
import compression from 'compression';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

dotenv.config();
const app = express();

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [responseCachePlugin()],
   cacheControl: {
      defaultMaxAge: Number(process.env.APOLLO_CACHE_EXPIRY_TIME_IN_SECS),
   },
});

app.use(cors());
app.use(express.json());
app.use(compression());
connect();

server.applyMiddleware({ app });

export { app };
