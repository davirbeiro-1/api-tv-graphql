const getAllTvShowsQuery = `query GetTvShows {
    getTvShows {
      name
    }
  }
`

const getTvByGenreQuery = `query GetTvByGenre($genre: String!) {
    getTvByGenre(genre: $genre) {
      name
    }
  }
`
const getActorsByTvShowIdQuery = `query Query($tvShowId: Float!) {
    getActorsByTvShowId(tvShowId: $tvShowId)
}
`
const getTvShowsByActorId = `
query Query($actorId: Float!) {
    getTvShowsByActorId(actorId: $actorId)
}`

export const mockQueries = {
    getAllTvShowsQuery,
    getTvByGenreQuery,
    getActorsByTvShowIdQuery,
    getTvShowsByActorId
}
