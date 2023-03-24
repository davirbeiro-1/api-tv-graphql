import { Arg, Mutation, Resolver, Query, Ctx } from 'type-graphql';
import { CreateEpisodeInput } from '../dto/input/create-episode.input';
import { Episode } from '../dto/model/episode.model';

@Resolver()
export class EpisodeResolver {
    @Query(() => String)
    async episode() {
        return 'Teste'
    }

    @Mutation(() => Episode)
    async createEpisode(
        @Arg('episodeInput') episodeInput: CreateEpisodeInput
    ): Promise<Episode> {

        const episode = new Episode({
            ...episodeInput,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        await episode.save();

        return episode;
    }
}