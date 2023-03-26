import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { Actor } from '../dto/model/actor.model';
import { TvShow } from '../dto/model/tv-show.model';
import { ErrorMessage } from '../utils/error-message';

@Resolver()
export class ActorResolver {
   
    @Query(() => [Actor])
    async getActorsByTvShowId(
        @Arg('tvShowId') tvShowId: number,
        ) {
        const tvShow = await TvShow.findByPk(tvShowId);
        
        if (!tvShow) {
            throw new Error(ErrorMessage.TVSHOW_NOT_FOUND);
        }

        const actors = await tvShow.$get('actors');
        return actors.map(actors => actors);
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