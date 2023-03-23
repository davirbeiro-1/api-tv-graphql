import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class EpisodeModel {
  @Field()
  name: String
  @Field()
  tvShow: String
  @Field()
  isReleased: Boolean
  @Field()
  releaseDate: Date
  @Field()
  duration: String 
  @Field()
  resume: String
}