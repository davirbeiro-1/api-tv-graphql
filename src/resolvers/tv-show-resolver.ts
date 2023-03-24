import { Arg, Mutation, Resolver, Query, Ctx } from 'type-graphql';
import { TvShow } from '../dto/model/tv-show-model';

@Resolver()
export class TvShowResolver {
    @Query(() => String)
    async tvShow() {
        return 'Teste'
    }

    @Mutation(() => TvShow)
    async createTvShow(
        @Arg('name') name: string,
        @Arg('startsAt') startsAt: string,
        @Arg('endsAt') endsAt: string,
        @Arg('numberOfEpisodes') numberOfEpisodes: string,
        @Arg('numberOfSeasons') numberOfSeasons: string,
        @Arg('description') description: string,
    ): Promise<TvShow> {


        const tvShow = new TvShow({
            name,
            startsAt,
            endsAt,
            numberOfEpisodes,
            numberOfSeasons,
            description,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await tvShow.save();

        return tvShow;
    }
}