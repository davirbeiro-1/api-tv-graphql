interface UserInput {
    name: string,
    password: string,
    email: string
}

interface TvShowData {
    name: string;
    startsAt: string;
    endsAt: string;
    numberOfEpisodes: number;
    numberOfSeasons: number;
    description: string;
    genre: string;
    network: string;
  }

interface TVShowInputData {
    actorsIds: string[];
    description: string;
    numberOfSeasons: string;
    numberOfEpisodes: string;
    genre: string;
    endsAt: string;
    startsAt: string;
    name: string;
    plataformToWatch: string;
}

interface TVShowInput {
    data: TVShowInputData;
}

interface EpisodeInput {
    description: string,
    tvShowId: number
    duration: string,
    releaseDate: string,
    isReleased: boolean,
    name: string
}

interface ActorInput {
    age: string,
    name: string
}
