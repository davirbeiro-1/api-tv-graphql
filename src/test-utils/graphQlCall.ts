import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql';
import { createSchema } from '../utils/createSchema'

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key:string]: any
    }>
}

let schema: GraphQLSchema

export async function graphQlCall({source, variableValues} : Options){
    
    if(!schema) {
        schema = await createSchema()
    }

    return graphql({
        schema,
        source,
        variableValues
    })
}