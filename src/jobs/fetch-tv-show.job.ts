import { CronJob } from 'cron';
import axios from 'axios';
import { TvShowResolver } from '../resolvers/tv-show-resolver';
const jobFrequency = '* * * * *';
let page = 0;

export const fetchTvShowsJob = new CronJob(jobFrequency, async () => {

    try {
        const tvShowsData = await _getDataFromApi();
        const tvShows: TvShowData[] = prepareTvShowsObject(tvShowsData);
        const actorsId = ["1"]
        const tvShowResolver = new TvShowResolver();
        for (const tvShow of tvShows) {
            const { name, description, startsAt, endsAt, numberOfEpisodes, numberOfSeasons, genre } = tvShow
            const existingTvShow = await tvShowResolver.getTvShowByName(name)
            if (!existingTvShow) {
                await tvShowResolver.createTvShow(name, description, startsAt, endsAt, numberOfEpisodes.toString(), numberOfSeasons.toString(), genre, actorsId);
            }
        }
    } catch (error) {
        console.error(`Error fetching TV show data: ${error}`);
    }
});

fetchTvShowsJob.start();

function prepareTvShowsObject(tvShowsData: any): TvShowData[] {
    return tvShowsData.map((tvShowData: TvShowData) => ({
        name: tvShowData.name ? tvShowData.name : "Not finished",
        startsAt: tvShowData.startsAt ? tvShowData.startsAt : "Not finished",
        endsAt: tvShowData.endsAt ? tvShowData.endsAt : "Not finished",
        numberOfEpisodes: tvShowData.numberOfEpisodes ? tvShowData.numberOfEpisodes.toString() : "5",
        numberOfSeasons: tvShowData.numberOfSeasons ? tvShowData.numberOfSeasons.toString() : "5",
        description: tvShowData.description ? tvShowData.description.toString() : "5",
        genre: tvShowData.genre ? tvShowData.genre : "action",
        plataformToWatch: tvShowData.network,
    }));
}

async function _getDataFromApi(): Promise<any> {
    while (page < 10) {
        page = page + 1
        const TV_SHOWS_API_URL = `https://www.episodate.com/api/most-popular?page=${page}?`;
        console.log(TV_SHOWS_API_URL);
        const response = await axios.get(TV_SHOWS_API_URL);
        const tvShowsData = response.data.tv_shows;
        return tvShowsData;
    }
    fetchTvShowsJob.stop();
}
