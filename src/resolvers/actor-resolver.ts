import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { Actor } from '../dto/model/actor.model';
import { TvShowActor } from '../dto/model/tv-show-actor.model';
import { TvShow } from '../dto/model/tv-show.model';

@Resolver()
export class ActorResolver {
    @Query(() => [String])
    async getTvShowsByActorId(
        @Arg('actorId') actorId: number,
    ) {
        const actor = await Actor.findByPk(actorId);
        if (!actor) {
          throw new Error(`Actor with id ${actorId} not found`);
        }
        
        const tvShows = await actor.$get('tvShows');
        return tvShows.map(tvShow => tvShow.name);
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