import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { TvShowActor } from '../dto/model/tv-show-actor.model';
import { TvShow } from '../dto/model/tv-show.model';
import { ErrorMessage } from '../utils/error-message';
@Resolver()
export class TvShowResolver {
    @Query(() => [TvShow])
    async getTvShows(): Promise<TvShow[]> {
        const tvShows = await TvShow.findAll()
        return tvShows
    }

    @Query(() => [String])
    async getActorsByTvShowId(
        @Arg('tvShowId') tvShowId: number,
    ) {
        const tvShow = await TvShow.findByPk(tvShowId);
        if (!tvShow) {
            throw new Error(`Actor with id ${tvShow} not found`);
        }

        const actors = await tvShow.$get('actors');
        return actors.map(actors => actors.name);
    }

    @Query(() => [TvShow])
    async getTvByGenre(@Arg("genre") genre: string,
        @Arg("orderBy", () => [String]) orderBy: [string])
        : Promise<TvShow[]> {
        const attributes = Object.keys(TvShow.getAttributes())

        const isIncluded = orderBy.every((value) =>  attributes.includes(value));

        if(!isIncluded) {
            throw new Error(ErrorMessage.WRONG_ORDER_BY_PARAMS);
        }

        return await TvShow.findAll({ where: { genre }, order: orderBy })
    }

    @Mutation(() => TvShow)
    async createTvShow(
        @Arg('name') name: string,
        @Arg('startsAt') startsAt: string,
        @Arg('endsAt') endsAt: string,
        @Arg('genre') genre: string,
        @Arg('numberOfEpisodes') numberOfEpisodes: string,
        @Arg('numberOfSeasons') numberOfSeasons: string,
        @Arg('description') description: string,
        @Arg('actorsIds', () => [String]) actorsIds: string[]): Promise<TvShow> {

        const tvShow = new TvShow({
            name,
            startsAt,
            endsAt,
            numberOfEpisodes,
            numberOfSeasons,
            description,
            genre,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await tvShow.save();

        // validate this
        for (const actorId of actorsIds) {
            await TvShowActor.create({ tvShowId: tvShow.id, actorId });
        }


        return tvShow;
    }
}