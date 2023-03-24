import { Arg, Mutation, Resolver, Query, Ctx } from 'type-graphql';
import { Actor } from '../dto/model/actor-model';

@Resolver()
export class ActorResolver {
    @Query(() => String)
    async getActor() {
        return 'Teste'
    }

    @Mutation(() => Actor)
    async createActor(
        @Arg('name') name: string,
        @Arg('age') age: string,
    ): Promise<Actor> {


        const actor = new Actor({
            name,
            age,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await actor.save();

        return actor;
    }
}