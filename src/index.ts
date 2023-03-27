import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { sequelize } from './database';
import { createSchema } from './utils/createSchema';
import { fetchTvShowsJob } from './jobs/fetch-tv-show.job';
require('dotenv').config();

const app = express();

async function main() {
  await sequelize.authenticate();
  await sequelize.sync();

  const schema = await createSchema()

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, user: undefined }),
  });


  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  fetchTvShowsJob
}

main();