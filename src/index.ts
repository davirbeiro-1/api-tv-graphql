import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { sequelize } from '../database';
import { createSchema } from './utils/createSchema';


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
}

main();