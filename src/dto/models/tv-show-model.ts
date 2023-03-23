import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TvShowModel {
  @Field()
  name: String
  @Field()
  startDate: String
  @Field()
  endDate: String
  @Field()
  isRunning: String
  @Field()
  numberOfSeasons: Number 
  @Field()
  numberOfEpisodes: Number
  @Field()
  genre: String
  @Field()
  plataformToWatch: String
  @Field()
  description: String
  @Field()
  actors: [String]
}