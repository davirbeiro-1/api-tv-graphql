const getAllTvShowsQuery = `query GetTvShows {
    getTvShows {
      name
    }
  }
`

const getTvByGenreQuery = `query GetTvShows($orderBy: [String!]!, $genre: String!) {
  getTvByGenre(orderBy: $orderBy, genre: $genre) { name }
}
`
const getActorsByTvShowIdQuery = `query Query($tvShowId: Float!) {
    getActorsByTvShowId(tvShowId: $tvShowId){
      name
    }
}
`
const getTvShowsByActorId = `
query Query($actorId: Float!) {
    getTvShowsByActorId(actorId: $actorId){name}
}`

export const mockQueries = {
    getAllTvShowsQuery,
    getTvByGenreQuery,
    getActorsByTvShowIdQuery,
    getTvShowsByActorId
}
