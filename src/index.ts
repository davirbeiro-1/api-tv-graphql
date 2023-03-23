import "reflect-metadata";
import path from 'node:path'
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql/dist/utils";
import { UserResolver } from "./resolvers/user-resolver";

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: path.resolve(__dirname,'schema.gql'),
        validate: {forbidUnknownValues: false}
    })
    const server = new ApolloServer({schema});
    const {url} = await server.listen()
    console.log(`Serving is running on ${url}`)
}

main()