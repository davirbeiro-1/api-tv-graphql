import { NonEmptyArray } from "type-graphql"
import { ActorResolver } from "../resolvers/actor-resolver"
import { EpisodeResolver } from "../resolvers/episode-resolver"
import { TvShowResolver } from "../resolvers/tv-show-resolver"
import { UserResolver } from "../resolvers/user-resolver"

export function getResolvers() : NonEmptyArray<any> {
   return [UserResolver, TvShowResolver, EpisodeResolver, ActorResolver]
} 