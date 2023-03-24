import { Arg, Mutation, Resolver, Query, Ctx } from 'type-graphql';
import { Episode } from '../dto/model/episode.model';

@Resolver()
export class EpisodeResolver {
    @Query(() => String)
    async episode() {
        return 'Teste'
    }

    @Mutation(() => Episode)
    async createEpisode(
        @Arg('name') name: string,
        @Arg('isReleased') isReleased: boolean,
        @Arg('releaseDate') releaseDate: string,
        @Arg('duration') duration: string,
        @Arg('tvShowId') tvShowId: number,
        @Arg('description') description: string,
    ): Promise<Episode> {

        const episode = new Episode({
            name,          
            isReleased,
            releaseDate,          
            duration,
            description,
            tvShowId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        await episode.save();

        return episode;
    }
}