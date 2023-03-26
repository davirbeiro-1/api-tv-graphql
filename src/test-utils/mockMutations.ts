const createActorMutation = `mutation Mutation($age: String!, $name: String!) {
    createActor(age: $age, name: $name) {
      name
      age
      id
    }
}`

const createTvShowMutation = `
mutation CreateTvShow($actorsIds: [String!]!, $description: String!, $numberOfSeasons: String!, $numberOfEpisodes: String!, $genre: String!, $endsAt: String!, $startsAt: String!, $name: String!) {
    createTvShow(actorsIds: $actorsIds, description: $description, numberOfSeasons: $numberOfSeasons, numberOfEpisodes: $numberOfEpisodes, genre: $genre, endsAt: $endsAt, startsAt: $startsAt, name: $name) {
      name
      description
      id
    }
}`

const createEpisodeMutation = `
mutation CreateEpisode($description: String!, $tvShowId: Float!, $duration: String!, $releaseDate: String!, $isReleased: Boolean!, $name: String!) {
    createEpisode(description: $description, tvShowId: $tvShowId, duration: $duration, releaseDate: $releaseDate, isReleased: $isReleased, name: $name) {
      name
    }
  }
`
const createUserMutation = `
mutation RegisterUser($name: String!, $password: String!, $email: String!) {
    registerUser(name: $name, password: $password, email: $email) {
      name,
      email  
    }
}`

const createFavoriteMutation = `mutation AddFavorite($tvShowId: String!, $userId: String!) {
  addFavorite(tvShowId: $tvShowId, userId: $userId){
      tvShowId
  }
}`

const removeFavoriteMutation = `mutation RemoveFavorite($tvShowId: String!, $userId: String!) {
  removeFavorite(tvShowId: $tvShowId, userId: $userId)
}
`

export const mockMutations = {
    createActor : createActorMutation,
    createTvShowMutation : createTvShowMutation,
    createEpisodeMutation : createEpisodeMutation,
    registerUserMutation:  createUserMutation,
    createFavoriteShow: createFavoriteMutation,
    removeFavoriteShow: removeFavoriteMutation
}
