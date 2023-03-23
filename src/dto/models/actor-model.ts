import { Field, ObjectType } from "type-graphql";
import { TvShowModel } from "./tv-show-model";

@ObjectType()
export class ActorModel {
  @Field()
  name: String
  @Field()
  appearances: [TvShowModel]
  @Field()
  age: Number
}